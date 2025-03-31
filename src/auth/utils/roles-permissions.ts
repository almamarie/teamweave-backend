import { Roles } from 'src/types';

 export const permissions = {
   SUPER_ADMIN: [
     // admin
     'create:admin',
     'get:own:user',
     'admin:profile',
     'admin:request',
     'get:admin:profile'
   ],

   ADMIN: [
     //user
     'get:own:user',
     'admin:profile',
     'admin:request',
     'get:admin:profile'
   ],

   PAIRER: ['pairer:user', 'get:own:user', 'admin:profile', 'admin:request', 'admin:match'],

   USER: [
     // user
     'get:own:user',
     'patch:own:user',

     // subscription
     'post:own:transaction',
     'post:own:verify-transaction',

     // Profile
     'post:own:profile',
     'get:own:profile',
     'patch:own:profile',
     'delete:own:profile',

     // Match Request
     'post:own:match-request',
     'get:own:match-request',
     'patch:own:match-request',
     'delete:own:match-request',

     // match
     'get:own:match'
   ]
 };


