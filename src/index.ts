import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

(async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });
  console.log(rc.token?.access_token);
  const r = await rc
    .restapi()
    .account()
    .extension()
    .answeringRule('business-hours-rule')
    .get();
  console.log(JSON.stringify(r, null, 2));
  await rc.revoke();
})();
