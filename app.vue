<template>
  <div>
    <p>phrase: {{ phrase }}</p>
    <p>result: {{ result }}</p>
  </div>
</template>
<script setup>
import {
  generatePhrase,
  validatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
} from '@xchainjs/xchain-crypto'

const phrase = ref('')
const result = ref('')

onMounted(async () => {
  console.log('Welcome to Nuxt!')
  phrase.value = generatePhrase()
  console.log("phrase: ", phrase.value)

  const keystore =  {
    "crypto": {
      "cipher": "aes-128-ctr",
      "ciphertext": "87604970d2b8b465518683b3a04ae1db1870ebebabee9df5ff0b7504213600e6c52997f8bda265c3e9c11de68ad17d2d6379e3dfb6295c50309db863fab6e7b3b28b3eeacdb1",
      "cipherparams": {
        "iv": "76e78e49f15f61706329a551b7fa15c8"
      },
      "kdf": "pbkdf2",
      "kdfparams": {
        "prf": "hmac-sha256",
        "dklen": 32,
        "salt": "36a4c0ac54b8837633acafa33d8f00d901050e667f93eb27f25abcf381ee2412",
        "c": 262144
      },
      "mac": "c1f9ca36fafb6d091d9a521ec3320b5bf7f16a5c6bdce733df231be90deb1e9d"
    },
    "id": "073c062b-15be-42b4-8b9f-ef6bc4c1c94a",
    "version": 1,
    "meta": "xchain-keystore"
  }

  result.value = await decryptFromKeystore(keystore, "1234")
  console.log('decryptFromKeystoreResult :>> ', result.value);
})
</script>
