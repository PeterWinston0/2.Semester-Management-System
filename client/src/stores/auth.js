import { createPinia, defineStore } from 'pinia';

export const pinia = createPinia();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (response.ok) {
          this.token = data.data.token;
          this.isAuthenticated = true;
          localStorage.setItem('token', this.token);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async register(userData) {
      try {
        const response = await fetch('http://localhost:3000/api/user/register', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (response.ok) {
          this.token = data.data.token;
          this.isAuthenticated = true;
          localStorage.setItem('token', this.token);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    initialize() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    },
  },
});







// import { createPinia, defineStore } from 'pinia';

// export const pinia = createPinia();

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     isAuthenticated: false,
//     token: null,
//   }),
//   actions: {
//     async login(credentials) {
//       try {
//         // Make a request to your login API to authenticate the user and get the token
//         const response = await fetch('http://localhost:3000/api/user/login', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           // Set the token in the store and mark the user as authenticated
//           this.token = data.data.token;
//           this.isAuthenticated = true;

//           console.log('Token:', this.token); // Log the token
//           // Store the token in localStorage
//           localStorage.setItem('token', this.token);
//         } else {
//           throw new Error(data.message);
//         }
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     },
//     async register(user) {
//       try {
//         const response = await fetch('http://localhost:3000/api/user/register', {
//           method: 'POST',
//           body: JSON.stringify(user),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();
    
//         if (response.ok) {
//           // Registration successful, you can handle it as needed
//           console.log('Registration successful:', data);
//         } else {
//           throw new Error(data.message);
//         }
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     },
//     logout() {
//       // Clear the token and mark the user as unauthenticated
//       this.token = null;
//       this.isAuthenticated = false;

//       // Remove the token from localStorage
//       localStorage.removeItem('token');
//     },
//     initialize() {
//       // Check if there is a token in localStorage on app initialization
//       const token = localStorage.getItem('token');
//       if (token) {
//         this.token = token;
//         this.isAuthenticated = true;
//       }
//     },
//   },
// });



// import { createPinia, defineStore } from 'pinia';

// export const pinia = createPinia();

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     isAuthenticated: false,
//     token: null,
//   }),
//   actions: {
//     async login(credentials) {
//       try {
//         // Make a request to your login API to authenticate the user and get the token
//         const response = await fetch('http://localhost:3000/api/user/login', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           // Set the token in the store and mark the user as authenticated
//           this.token = data.data.token;
//           this.isAuthenticated = true;

//           console.log('Token:', this.token); // Log the token
//           // Store the token in localStorage
//           localStorage.setItem('token', this.token);
//         } else {
//           throw new Error(data.message);
//         }
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     },
//     logout() {
//       // Clear the token and mark the user as unauthenticated
//       this.token = null;
//       this.isAuthenticated = false;

//       // Remove the token from localStorage
//       localStorage.removeItem('token');
//     },
//     initialize() {
//       // Check if there is a token in localStorage on app initialization
//       const token = localStorage.getItem('token');
//       if (token) {
//         this.token = token;
//         this.isAuthenticated = true;
//       }
//     },
//   },
// });
