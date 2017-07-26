import WiPubSub from '../lib/WiPubSub';
import testUser from './fixtures/user.json';
import {assertSuccessful, assertArray} from './helpers/callbacks';

describe('User', function() {
   let WiPubSub;
   let user;

   before(function() {
      WiPubSub = new WiPubSub({
         // username: testUser.USERNAME,
         // password: testUser.PASSWORD,
         // auth: 'basic',
      });
      user = WiPubSub.getUser();
   });

   it('should update user\'s profile', function(done) {
      const data = {
         login: "bluehackmaster",
         avatarUrl: "http://WiPubSub.io/sjff",
         email: "master@bluehack.net",
         oauthProvider: "github"
      };
      user.updateProfile(data, assertSuccessful(done));
   });

   it('should get user\'s profile', function(done) {
     var userId = '591075a71af9c1a44fa2616f'
     // console.log('test start')
     user.getProfile(userId, assertSuccessful(done));
   });

});
