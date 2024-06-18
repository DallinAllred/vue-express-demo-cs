<script setup>
import { ref } from 'vue';

const encryptSpaces = ref(false);

const plainText = ref('');
const cipherText = ref('');
const bookText = ref('');


function encrypt() {
    let plain = plainText.value.toLowerCase();
    let bookData = readBook();
    let book = bookData.book;
    let pages = bookData.pageList;
    let cipher = [];

    for (let i = 0; i < plain.length; i++) {
        let char = plain.charAt(i);
        if (!encryptSpaces.value && char === ' '){
            cipher.push(char);
        }
        else {
            let pageIndex = getRandomInt(pages.length);
            let startingPageIndex = pageIndex;
            let page = pages[pageIndex];
            let charIndex = getRandomInt(book[page].length);
            let charFound = false;
            for (let j = 0; j < pages.length; j++) {
                for (let k = 0; k < book[page].length; k++) {
                    
                    if (book[page].charAt(charIndex) == char) {
                        cipher.push(`${page}-${charIndex}`);
                        charFound = true;
                        break;
                    }
                    charIndex++;
                    if (charIndex == book[page].length){
                        charIndex = 0;
                    }
                }
                if (charFound) break;
                pageIndex++;
                if (pageIndex == pages.length) {
                    pageIndex = 0
                }
                if (pageIndex == startingPageIndex){
                    cipher.push(char);
                    break;
                }
                page = pages[pageIndex];
            }
        }
    }
    cipherText.value = cipher.join('_');
}

function decrypt() {
    let plain = [];
    let cipher = cipherText.value.split('_');
    let book = readBook().book;
    for (let i = 0; i < cipher.length; i++) {
        if (cipher[i].length == 1) plain.push(cipher[i]);
        else {
            let temp = cipher[i].split('-');
            plain.push(book[temp[0]].charAt(temp[1]));
        }
    }
    plainText.value = plain.join('');
}

function readBook() {
    let book = bookText.value.toLowerCase();
    if (book === '') {
        alert("Invalid Book text");
        return;
    }
    let pageList = [];
    if (!encryptSpaces.value) {
        book = book.replaceAll(' ', '');
    }
    book = book.split('&&&');
    if (book.length == 1) {
        book = {0: book[0]};
        pageList.push(0);
    }
    else {
        book = book.splice(1);
        let temp = {};
        for (let i = 0; i < book.length; i+=2) {
            let page = book[i].slice(1,3);
            page = parseInt(page);
            if (isNaN(page)) {
                plainText.value = "Error: Incompatible ciphertext format";
                return;
            }
            temp[page] = book[i + 1];
            pageList.push(page);
        }
        book = temp;
    }
    return {
        book: book,
        pageList: pageList
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
</script>

<template>
    <v-container fluid class="mx-6">
        <v-row>
            <h2>The Book Cipher</h2>
        </v-row>
    
        <v-row>
            <v-col cols="4">
                <p>
                    The book cipher replaces every letter of the plaintext with one of its positions in a book. There are several different methods of accomplishing this.
                    In some cases the page number, word on the page, and the position of the letter in the word are used. In this example only the page number and character position in the page string are used
                    (zero indexed).
                </p>
                <v-label class="mt-4">Ciphertext Format</v-label>
                <p>Each encrypted character will be displayed in the format page-char. All characters are separated by an underscore. Characters that are not in the book text will be shown by themselves in plaintext.</p>
                <p class="mt-2"><h4>Example</h4>12-30_1_z_1-25</p>
                <ul class="pl-6">
                    <li>Character 1: 12-30 indicates the 12th page, 30th character.</li>
                    <li>Character 2: 1 by itself means it is not in the book and so represents itself.</li>
                    <li>Character 3: z by itself means it is not in the book and so represents itself.</li>
                    <li>Character 4: 1-25 indicates the 1st page, 25th character.</li>
                </ul>
                <p>If no pages are used then the page number will default to zero for all characters.</p>
                
                <v-label class="mt-4">Book Formatting</v-label>
                <h4>No Pages</h4>
                <p>Paste all text as one continuous string. Cipher text will indicate the character's position in the string.</p>
                
                <h4 class="mt-2">With Pages</h4>
                <p>Start each page, including the first with the character sequence &&&[page number]&&&.</p>
                <p>Example: &&&[23]&&&</p>
            </v-col>
            <v-col class="page mx-8">
                <v-checkbox class="mx-6" label="Encrypt Spaces" v-model="encryptSpaces" color="success"></v-checkbox>
                <div class="mx-6">
                    <v-textarea  label="Book Text" variant="outlined" v-model="bookText"></v-textarea>
                </div>
                <div class="mx-6">
                    <v-textarea label="Plaintext" variant="outlined" v-model="plainText"></v-textarea>
                </div>

                <v-container fluid class="mx-6">
                    <v-row>
                        <v-col cols="2" class="mb-6">
                            <v-btn variant="tonal" @click="encrypt()">
                                Encrypt
                            </v-btn>
                        </v-col>
                        <v-col cols="2" class="mb-6">
                            <v-btn variant="tonal" @click="decrypt()">
                                Decrypt
                            </v-btn>
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