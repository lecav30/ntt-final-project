package com.nttfinalproject

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.libraryhooks.NetworkMonitorModule
import com.securestorage.SecureStorageModule
import java.util.HashMap

class NttFinalProjectPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      NttFinalProjectModule.NAME -> NttFinalProjectModule(reactContext)
      SecureStorageModule.NAME -> SecureStorageModule(reactContext)
      NetworkMonitorModule.NAME -> NetworkMonitorModule(reactContext)
      else -> null
    } as NativeModule?
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      moduleInfos[NttFinalProjectModule.NAME] = ReactModuleInfo(
        NttFinalProjectModule.NAME,
        NttFinalProjectModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfos[SecureStorageModule.NAME] = ReactModuleInfo(
        SecureStorageModule.NAME,
        SecureStorageModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfos[NetworkMonitorModule.NAME] = ReactModuleInfo(
        NetworkMonitorModule.NAME,
        NetworkMonitorModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfos
    }
  }
}
