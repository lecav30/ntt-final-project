package com.securestorage

import android.content.Context
import android.content.SharedPreferences
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.module.annotations.ReactModule
import com.nttfinalproject.NativeSecureStorageSpec
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

@ReactModule(name = SecureStorageModule.NAME)
class SecureStorageModule(reactContext: ReactApplicationContext) :
  NativeSecureStorageSpec(reactContext) {

  private val KEYSTORE_PROVIDER = "AndroidKeyStore"
  private val KEY_ALIAS = "SecureStorageKey"
  private val TRANSFORMATION = "AES/GCM/NoPadding"
  private val GCM_TAG_LENGTH = 128

  private val sharedPreferences: SharedPreferences = reactContext
    .getSharedPreferences("secure_storage_prefs", Context.MODE_PRIVATE)

  private val keyStore: KeyStore = KeyStore.getInstance(KEYSTORE_PROVIDER).apply {
    load(null)
  }

  init {
    // Generar clave si no existe
    if (!keyStore.containsAlias(KEY_ALIAS)) {
      generateKey()
    }
  }

  override fun getName(): String = NAME

  /**
   * Genera una clave AES usando KeyGenerator y la almacena en Android KeyStore
   */
  private fun generateKey() {
    val keyGenerator = KeyGenerator.getInstance(
      KeyProperties.KEY_ALGORITHM_AES,
      KEYSTORE_PROVIDER
    )

    val keyGenParameterSpec = KeyGenParameterSpec.Builder(
      KEY_ALIAS,
      KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
    )
      .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
      .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
      .setRandomizedEncryptionRequired(true)
      .build()

    keyGenerator.init(keyGenParameterSpec)
    keyGenerator.generateKey()
  }

  /**
   * Obtiene la clave secreta del KeyStore
   */
  private fun getSecretKey(): SecretKey {
    val entry = keyStore.getEntry(KEY_ALIAS, null) as KeyStore.SecretKeyEntry
    return entry.secretKey
  }

  /**
   * Encripta un texto usando AES/GCM
   */
  private fun encrypt(plainText: String): Pair<String, String> {
    val cipher = Cipher.getInstance(TRANSFORMATION)
    cipher.init(Cipher.ENCRYPT_MODE, getSecretKey())

    val iv = cipher.iv
    val encryptedBytes = cipher.doFinal(plainText.toByteArray(Charsets.UTF_8))

    val encryptedData = Base64.encodeToString(encryptedBytes, Base64.DEFAULT)
    val ivString = Base64.encodeToString(iv, Base64.DEFAULT)

    return Pair(encryptedData, ivString)
  }

  /**
   * Desencripta un texto usando AES/GCM
   */
  private fun decrypt(encryptedData: String, ivString: String): String {
    val cipher = Cipher.getInstance(TRANSFORMATION)
    val iv = Base64.decode(ivString, Base64.DEFAULT)
    val gcmSpec = GCMParameterSpec(GCM_TAG_LENGTH, iv)

    cipher.init(Cipher.DECRYPT_MODE, getSecretKey(), gcmSpec)

    val encryptedBytes = Base64.decode(encryptedData, Base64.DEFAULT)
    val decryptedBytes = cipher.doFinal(encryptedBytes)

    return String(decryptedBytes, Charsets.UTF_8)
  }

  override fun setItem(key: String, value: String, promise: Promise) {
    try {
      val (encryptedData, iv) = encrypt(value)

      sharedPreferences.edit().apply {
        putString("${key}_data", encryptedData)
        putString("${key}_iv", iv)
        apply()
      }

      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", "Failed to save item: ${e.message}", e)
    }
  }

  override fun getItem(key: String, promise: Promise) {
    try {
      val encryptedData = sharedPreferences.getString("${key}_data", null)
      val iv = sharedPreferences.getString("${key}_iv", null)

      if (encryptedData == null || iv == null) {
        promise.resolve(null)
        return
      }

      val decryptedValue = decrypt(encryptedData, iv)
      promise.resolve(decryptedValue)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", "Failed to get item: ${e.message}", e)
    }
  }

  override fun removeItem(key: String, promise: Promise) {
    try {
      sharedPreferences.edit().apply {
        remove("${key}_data")
        remove("${key}_iv")
        apply()
      }
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", "Failed to remove item: ${e.message}", e)
    }
  }

  override fun getAllKeys(promise: Promise) {
    try {
      val allKeys = sharedPreferences.all.keys
      val keys = allKeys
        .filter { it.endsWith("_data") }
        .map { it.removeSuffix("_data") }
        .toList()

      val array = WritableNativeArray()
      keys.forEach { array.pushString(it) }

      promise.resolve(array)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", "Failed to get keys: ${e.message}", e)
    }
  }

  override fun clear(promise: Promise) {
    try {
      sharedPreferences.edit().clear().apply()
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", "Failed to clear storage: ${e.message}", e)
    }
  }

  companion object {
    const val NAME = "SecureStorage"
  }
}
