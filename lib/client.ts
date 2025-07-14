import { Account, Client, Databases, Storage, Functions } from 'react-native-appwrite';

let client: Client;
let database: Databases;
let account: Account
let storage: Storage;
let functions: Functions;

client = new Client();
client.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string).setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string).setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string);

database = new Databases(client);

storage = new Storage(client);

account = new Account(client);

functions = new Functions(client);

export { client, database, storage, account, functions };