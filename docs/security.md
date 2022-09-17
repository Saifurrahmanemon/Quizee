# 🔐 Security

### Authentication

This App use [Firebase](firebase.google.com) and [JWT](https://jwt.io/) for authenticating users.During logging in / registration user receive a token that is stored in the localStorage, and then on each authenticated request user send the token in the header via axios along with the request.

[Auth Configuration Code](../src/pages/Auth/AuthForm/AuthenticationForm.tsx)

### Authorization

Authorization use both RBAC (Role based access control) and PBAC (Permission based access control) auth. Backend contains middleware for verifying different user. Frontend use custom hooks for that.

[Middleware](../backend/middleware/verifyJWT.js) <br>
[Custom Hooks](../src/hooks/useToken.ts)
