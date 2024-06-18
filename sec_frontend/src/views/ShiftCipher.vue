<script setup>
import { ref } from 'vue';

const charSpace = ref('0');

const plainText = ref('');
const cipherText = ref('');
const shiftCount = ref(0);

const charSpaces = [
    'abcdefghijklmnopqrstuvwxyz',
    'abcdefghijklmnopqrstuvwxyz ',
    'abcdefghijklmnopqrstuvwxyz0123456789',
    'abcdefghijklmnopqrstuvwxyz0123456789 '
]

function encrypt() {
    let charSet = charSpaces[charSpace.value].split('');
    let msg = plainText.value.toLowerCase().split('');
    for (let [i, char] of msg.entries()) {
        if (charSet.includes(char)) {
            let index = charSet.findIndex(c => c == char);
            let shift = shiftCount.value;
            if (shift < 0) {
                shift = (shift % charSet.length) + charSet.length
            }
            let shiftIndex = (index + shift) % charSet.length
            msg[i] = charSet[shiftIndex]
        }
    }
    cipherText.value = msg.join('');
}

function decrypt() {
    let charSet = charSpaces[charSpace.value].split('');
    let msg = cipherText.value.toLowerCase().split('');
    for (let [i, char] of msg.entries()) {
        if (charSet.includes(char)) {
            let index = charSet.findIndex(c => c == char);
            let shiftIndex = index - shiftCount.value
            if (shiftIndex < 0) {
                shiftIndex = (shiftIndex % charSet.length) + charSet.length 
            }
            else {
                shiftIndex = shiftIndex % charSet.length
            }
            msg[i] = charSet[shiftIndex]
        }
    }
    plainText.value = msg.join('');
}
</script>

<template>
    <v-container fluid class="mx-6">
        <v-row>
            <h2>The Shift Cipher</h2>
        </v-row>
        <v-row>
            <v-col cols="4">
                <p>
                    The shift cipher, sometimes referred to as the Caesar Cipher, is a substitution cipher that works by shifting each letter a fixed number of spaces in the alphabet.
                    When the end of the alphabet is reached the cipher wraps back to the beginning. For example, with a shift of 4, the letter A becomes E, Y becomes C, and so on.
                </p>
                <p class="py-3">
                    The cipher is readily cracked by using frequency analysis which uses word size and the fact that some letters are more common than others. It may also be cracked by a simple brute force attack wherein each possible shift value is tried until the resulting plaintext makes a meaningful statement.
                </p>
                <v-label>Page Use</v-label>
                <ol class="pl-6">
                    <li>Using the Shift input, select the number of characters to shift</li>
                    <li>Select the desired character set. If using Alphabet Only then digits will be left in their original form. The 'w/ Space' options treat a space like a character in the set, appended to the end of the list.</li>
                    <li>To Encrypt, enter a string in the Plaintext input and select Encrypt. The result will show in the Ciphertext field</li>
                    <li>To Decrypt, enter a string in the Ciphertext input and select Decrypt. The result will show in the Plaintext field</li>
                </ol>

            </v-col>
            <v-col class="page mx-8">
                <div class="mx-6">
                    <v-label>
                        Shift
                    </v-label>
                    <v-input>
                        <input type="number" placeholder="0" class="text-white pa-1" v-model="shiftCount">
                    </v-input>
                </div>
                <div class="mx-6">
                    <v-textarea label="Plaintext" variant="outlined" v-model="plainText"></v-textarea>
                </div>

                <v-container fluid class="mx-6">
                    <v-row>
                        <v-col cols="2">
                            <v-row class="my-6">
                                <v-btn variant="tonal" class="mr-6" @click="encrypt()">
                                    Encrypt
                                </v-btn>
                            </v-row>
                            <v-row class="my-6">
                                <v-btn variant="tonal" @click="decrypt()">
                                    Decrypt
                                </v-btn>
                            </v-row>
                            
                        </v-col>
                        <v-col>
                            <v-radio-group column v-model="charSpace">
                                <v-radio label="Alphabet Only" color="success" value="0"></v-radio>
                                <v-radio label="Alphabet w/ Space" color="success" value="1"></v-radio>
                                <v-radio label="AlphaNumeric" color="success" value="2"></v-radio>
                                <v-radio label="AlphaNumeric w/ Space" color="success" value="3"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>
                
                <div class="mx-6">
                    <v-textarea label="Ciphertext" variant="outlined" v-model="cipherText"></v-textarea>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
input[type='number'] {
  border: white solid 1px;
}
</style>