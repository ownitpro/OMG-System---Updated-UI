// Script to add a user to Cognito
// Run with: node scripts/add-cognito-user.js

const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'ca-central-1',
});

async function addCognitoUser() {
  const email = 'ownittest1@gmail.com';
  const name = 'Mike';
  const password = 'Admin123!'; // Must meet Cognito requirements (uppercase, lowercase, number, special char)
  const userId = 'b3660c7a-0fba-43f4-9294-e05a1385b489'; // From database

  const userPoolId = process.env.COGNITO_USER_POOL_ID;

  if (!userPoolId) {
    console.error('COGNITO_USER_POOL_ID not set in environment');
    process.exit(1);
  }

  console.log('Creating Cognito user:', { email, name, userPoolId });

  try {
    // Create user with temporary password
    const createCommand = new AdminCreateUserCommand({
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'name', Value: name },
      ],
      MessageAction: 'SUPPRESS', // Don't send welcome email
    });

    await cognitoClient.send(createCommand);
    console.log('Cognito user created');

    // Set permanent password
    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: userPoolId,
      Username: email,
      Password: password,
      Permanent: true,
    });

    await cognitoClient.send(setPasswordCommand);
    console.log('Password set');

    console.log('\n✅ Cognito user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Note: Password is Admin123! (with special char) to meet Cognito requirements');

  } catch (error) {
    if (error.name === 'UsernameExistsException') {
      console.log('User already exists in Cognito, updating password...');

      // Just update the password
      const setPasswordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: userPoolId,
        Username: email,
        Password: password,
        Permanent: true,
      });

      await cognitoClient.send(setPasswordCommand);
      console.log('Password updated');
      console.log('\n✅ User password updated!');
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.error('Error:', error);
      throw error;
    }
  }
}

addCognitoUser().catch(console.error);
