#import "SecureStorage.h"
#import "NttFinalProject-Swift.h"

@implementation SecureStorage {
  SecureStorageCore *_storage;
}

RCT_EXPORT_MODULE()

- (instancetype)init {
  if (self = [super init]) {
    _storage = [[SecureStorageCore alloc] init];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSecureStorageSpecJSI>(params);
}

- (void)setItem:(nonnull NSString *)key
          value:(nonnull NSString *)value
        resolve:(nonnull RCTPromiseResolveBlock)resolve
         reject:(nonnull RCTPromiseRejectBlock)reject
{
  [_storage setItem:key value:value resolver:resolve rejecter:reject];
}

- (void)getItem:(nonnull NSString *)key
        resolve:(nonnull RCTPromiseResolveBlock)resolve
         reject:(nonnull RCTPromiseRejectBlock)reject
{
  [_storage getItem:key resolver:resolve rejecter:reject];
}

@end
