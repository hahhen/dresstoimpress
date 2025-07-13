import { Account, Client, Databases, Storage, Models } from 'react-native-appwrite';

let client: Client;
let database: Databases;
let account: Account
let storage: Storage;

client = new Client();
client.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string).setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string).setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string);

database = new Databases(client);

storage = new Storage(client);

account = new Account(client);

export { client, database, storage, account };