<script setup>
import { ref, onMounted } from 'vue';
import initSqlJs from 'sql.js';

let db;
let host = 'localhost:3000';

onMounted(async () => {
    const sqlPromise = initSqlJs({
        locateFile: file => `src/assets/sql/${file}`
    });
    const dataPromise = fetch(`http://${host}/db`).then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
    db = new SQL.Database(new Uint8Array(buf));
});

const username = ref('');
const user = ref('');
const password = ref('');
const loginSql = ref('');

const loginSuccess = ref(false);

function logMeIn() {
    loginSuccess.value = false;
    let sqlstr = `SELECT lastName, firstName \
    FROM users WHERE username = '${username.value}' \
    AND password = '${password.value}'`;

    loginSql.value = sqlstr;

    let result;
    try {
        result = db.exec(sqlstr);
    }
    catch {
        result = null;
    }
    if (result && result.length > 0) {
        loginSuccess.value = true;
        user.value = result[0].values.join(' ');
    }
}
</script>

<template>
    <v-container fluid class="mx-6">
        <v-row>
            <h2>SQL Injection</h2>
        </v-row>
        <v-row>
            <v-col cols="4">
                <div class="py-2">
                    <h3>Step 1 - Close the string</h3>
                    Data fields like usernames and passwords are often strings in the query. Closing the string with a single quote allows further SQL commands to be appended.
                </div>
                
                <div class="py-2">
                    <h3>Step 2 - Add a Tautology</h3>
                    After the now closed string, insert a tautology (statement that is always true). The simplest case is to add "OR 1=1".
                </div>

                <div class="py-2">
                    <h3>Step 3 - Comment the Remainder</h3>
                    Since there is likely additional SQL code after the injected changes it is often best to comment it out. This is done by appending the string "-- " to the injected code 
                    (note the space at the end as a precaution against unexpected spacing in the intended SQL).
                </div>

                <div class="py-2">
                    <h3>Sample Injections</h3>
                    <ol class="pl-6">
                        <li><span class="example">Get Table Names</span><br><em>' UNION SELECT 1, name FROM sqlite_schema  WHERE type = 'table'  AND name NOT LIKE 'sqlite_%' ORDER BY 1; --</em></li>
                        <li><span class="example">Get Columns in User Table (SQLite Table create code)</span><br><em>' UNION SELECT 1, sql FROM sqlite_master WHERE tbl_name = 'users' AND type = 'table' --</em></li>
                        <li><span class="example">Get Columns in Customers Table (SQLite Table create code)</span><br><em>' UNION SELECT 1, sql FROM sqlite_master WHERE tbl_name = 'customers' AND type = 'table' --</em></li>
                    </ol>
                </div>

            </v-col>
            <v-col>
                <div class="page ma-6 pa-6">
                    <v-row>
                        <h3>Login</h3>
                    </v-row>
                    <v-row>
                        <v-label class="mr-2">Username</v-label>
                    </v-row>
                    <v-row>
                        <v-input>
                            <input type="text" class="text-white pa-1" v-model="username">
                        </v-input>
                    </v-row>
                    <v-row>
                        <v-label class="mr-2">Password</v-label>
                    </v-row>
                    <v-row>
                        <v-input>
                            <input class="text-white pa-1" v-model="password">
                        </v-input>
                    </v-row>
                    <v-row>
                        <v-btn type="submit" variant="tonal" @click="logMeIn()">Submit</v-btn>
                    </v-row>
                    <v-row>
                        <p v-if="loginSql != ''" class="mt-2">Executed SQL: {{ loginSql }}</p>
                    </v-row>
                </div>

                <v-row v-if="loginSuccess" class="page ma-6 pa-6">
                    <h3>Welcome {{ user }}</h3>
                    <v-divider></v-divider>
                    <h2 class="my-4 demo-title">Secure Computing Inc.</h2>
                    <v-divider></v-divider>
                    <p class="my-6">
                        There is no way we'll ever lose your data or suffer a hack.
                    </p>
                </v-row>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
input {
  border: white solid 1px;
}

.demo-title {
    color: red;
}
.example {
    font-weight: bold;
}
.page {
    border: grey solid 2px;
}
</style>