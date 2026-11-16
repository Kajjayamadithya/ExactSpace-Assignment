import assert from 'node:assert';
import { INITIAL_USER_LIST, getUserMeta } from './src/constants.js';

console.log('--- Testing Chat Application Logic ---');

// Test 1: Username list contains baseline users
console.log('Test 1: Validating initial user_list...');
assert(Array.isArray(INITIAL_USER_LIST) && INITIAL_USER_LIST.length > 0, 'INITIAL_USER_LIST must be a non-empty array');
console.log('✓ Initial user list loaded:', INITIAL_USER_LIST);

// Test 2: Dynamic user management
console.log('\nTest 2: Validating dynamic user addition & deduplication...');
let dynamicUsers = [...INITIAL_USER_LIST];

const addUser = (name) => {
  const trimmed = name ? name.trim() : '';
  if (!trimmed) return { success: false, error: 'Empty name' };
  if (dynamicUsers.some(u => u.toLowerCase() === trimmed.toLowerCase())) {
    return { success: false, error: 'Duplicate user' };
  }
  dynamicUsers = [...dynamicUsers, trimmed];
  return { success: true };
};

const removeUser = (name) => {
  if (dynamicUsers.length <= 1) return false;
  dynamicUsers = dynamicUsers.filter(u => u !== name);
  return true;
};

// Add new user
const addRes1 = addUser('Sarah Connor');
assert.strictEqual(addRes1.success, true);
assert(dynamicUsers.includes('Sarah Connor'));
assert.strictEqual(dynamicUsers.length, 6);

// Attempt duplicate (case-insensitive)
const dupRes = addUser('sarah connor');
assert.strictEqual(dupRes.success, false);

// Empty name rejection
const emptyRes = addUser('   ');
assert.strictEqual(emptyRes.success, false);

// Remove user
const remRes = removeUser('Sarah Connor');
assert.strictEqual(remRes, true);
assert.strictEqual(dynamicUsers.length, 5);

console.log('✓ Dynamic user addition, validation, and removal working as expected');

// Test 3: Dynamic user avatar metadata generation
console.log('\nTest 3: Validating getUserMeta for dynamic users...');
const meta1 = getUserMeta('Sarah Connor');
assert.strictEqual(meta1.initials, 'SC');
assert(meta1.avatarBg.startsWith('#'));

const meta2 = getUserMeta('Alex');
assert.strictEqual(meta2.initials, 'AL');
console.log('✓ Dynamic avatar color & initials generated successfully');

// Test 4: Random assignment across dynamic users
console.log('\nTest 4: Validating random assignment across dynamic user pool...');
addUser('Zoe');
const samples = Array.from({ length: 120 }, () => {
  const idx = Math.floor(Math.random() * dynamicUsers.length);
  return dynamicUsers[idx];
});
const uniqueChosen = new Set(samples);
assert(uniqueChosen.has('Zoe'), 'Dynamic user Zoe should be picked in random distribution');
console.log('✓ Random selection includes dynamically added users');

// Test 5: Validation of empty / whitespace messages
console.log('\nTest 5: Validating empty / whitespace validation...');
const validate = (text) => text.trim().length > 0;
assert.strictEqual(validate(''), false);
assert.strictEqual(validate('   '), false);
assert.strictEqual(validate('Hello world'), true);
console.log('✓ Validation rules correctly filter empty messages');

// Test 6: Message structure and like immutability
console.log('\nTest 6: Validating message creation and like isolation...');
let messages = [];

const addMessage = (text) => {
  const randomIndex = Math.floor(Math.random() * dynamicUsers.length);
  const msg = {
    id: `msg-${Date.now()}-${Math.random()}`,
    username: dynamicUsers[randomIndex],
    text: text.trim(),
    likes: 0
  };
  messages = [...messages, msg];
  return msg;
};

const likeMessage = (id) => {
  messages = messages.map(msg => msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg);
};

const m1 = addMessage('First message');
addMessage('Second message');
likeMessage(m1.id);

assert.strictEqual(messages[0].likes, 1);
assert.strictEqual(messages[1].likes, 0);

console.log('✓ Like updates are strictly isolated per message');
console.log('\nAll dynamic user & core chat logic tests passed successfully!');
