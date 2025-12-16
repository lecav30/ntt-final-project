package com.libraryhooks;

import android.Manifest
import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import androidx.annotation.RequiresPermission
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule
import com.nttfinalproject.NativeNetworkMonitorSpec

@ReactModule(name = NetworkMonitorModule.NAME)
class NetworkMonitorModule(reactContext: ReactApplicationContext): NativeNetworkMonitorSpec(reactContext) {

  private val connectivityManager = reactContext
    .getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  private fun getCurrentNetworkState(): WritableMap {
    val map = WritableNativeMap()

    val network = connectivityManager.activeNetwork
    val capabilities = connectivityManager.getNetworkCapabilities(network)

    if (capabilities == null) {
      map.putString("type", "none")
      map.putBoolean("isConnected", false)
      map.putBoolean("isInternetReachable", false)
      return map
    }

    val type = when {
      capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "wifi"
      capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "cellular"
      else -> "unknown"
    }

    map.putString("type", type)
    map.putBoolean("isConnected", true)
    map.putBoolean("isInternetReachable",
      capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET))

    return map
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun getCurrentState(promise: Promise) {
    try {
      val state = getCurrentNetworkState()
      promise.resolve(state)
    } catch (e: Exception) {
      promise.reject("NETWORK_ERROR", "Failed to get current state: ${e.message}", e)
    }
  }

  companion object {
    const val NAME = "NetworkMonitor"
  }
}
