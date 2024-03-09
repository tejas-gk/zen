        /* exported gapiLoaded */
        /* exported gisLoaded */
        /* exported handleAuthClick */
        /* exported handleSignoutClick */

        // TODO(developer): Set to client ID and API key from the Developer Console
        const CLIENT_ID = '7464836572-lq57ibd7mi4t5dctk95lhp89b04vitkv.apps.googleusercontent.com';
        const API_KEY = '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';

        // Discovery doc URL for APIs used by the quickstart
        const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

        let tokenClient;
        let gapiInited = false;
        let gisInited = false;

        // document.getElementById('authorize_button').style.visibility = 'hidden';
        // document.getElementById('signout_button').style.visibility = 'hidden';

        /**
         * Callback after api.js is loaded.
         */
        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }

        /**
         * Callback after the API client is loaded. Loads the
         * discovery doc to initialize the API.
         */
        async function initializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            gapiInited = true;
            maybeEnableButtons();
        }

        /**
         * Callback after Google Identity Services are loaded.
         */
        function gisLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });
            gisInited = true;
            maybeEnableButtons();
        }

        /**
         * Enables user interaction after all libraries are loaded.
         */
        function maybeEnableButtons() {
            if (gapiInited && gisInited) {
                document.getElementById('authorize_button').style.visibility = 'visible';
            }
        }

        /**
         *  Sign in the user upon button click.
         */
        function handleAuthClick() {
            tokenClient.callback = async (resp) => {
                if (resp.error !== undefined) {
                    throw (resp);
                }
                document.getElementById('signout_button').style.visibility = 'visible';
                document.getElementById('authorize_button').innerText = 'Refresh';
                await listLabels();
            };

            if (gapi.client.getToken() === null) {
                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                tokenClient.requestAccessToken({
                    prompt: 'consent'
                });
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                tokenClient.requestAccessToken({
                    prompt: ''
                });
            }
        }

        /**
         *  Sign out the user upon button click.
         */
        function handleSignoutClick() {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
                document.getElementById('content').innerText = '';
                document.getElementById('authorize_button').innerText = 'Authorize';
                document.getElementById('signout_button').style.visibility = 'hidden';
            }
        }

        /**
         * Print all Labels in the authorized user's inbox. If no labels
         * are found an appropriate message is printed.
         */
  async function listLabels() {
      let response;
      let labels = [];
      try {
          response = await gapi.client.gmail.users.labels.list({
              'userId': 'me',
          });
      } catch (err) {
          console.error(err.message);
          return [];
      }

      const resultLabels = response.result.labels;

      if (!resultLabels || resultLabels.length === 0) {
          console.error('No labels found.');
          return [];
      }

      labels = resultLabels.map(label => label.name);

      console.log('Labels:', labels);
      return labels;
  }



        async function listMessages() {
            let response;
            try {
                response = await gapi.client.gmail.users.messages.list({
                    'userId': 'me',
                    'maxResults': 10
                });
            } catch (err) {
                document.getElementById('content').innerText = err.message;
                return;
            }
            const messages = response.result.messages;
            if (!messages || messages.length == 0) {
                document.getElementById('content').innerText = 'No messages found.';
                return;
            }
            let msg = []
            // Retrieve each message and display it
            for (const message of messages) {
                await showMessage(message.id);
                msg.push(await showMessage(message.id))
            }
            console.log(msg)
            return msg
        }

        async function showMessage(messageId) {
            let response;
            try {
                response = await gapi.client.gmail.users.messages.get({
                    'userId': 'me',
                    'id': messageId,
                    'format': 'full'
                });
            } catch (err) { 
                console.error('Error fetching message:', err);
                return;
            }
            const message = response.result;
            const snippet = message.snippet;
            let body = '';
            if (message.payload && message.payload.parts) {
                for (const part of message.payload.parts) {
                    if (part.mimeType === 'text/plain') {
                        body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/')); // Decode base64 body
                        break;
                    }
                }
            }

            let msg = []
            // msg.push(snippet)
            // msg.push(body)
            msg.push({
                name: snippet,
                text: body,
                id: messageId,
                subject: message.payload.headers.find(h => h.name === 'Subject').value,
                from: message.payload.headers.find(h => h.name === 'From').value,
                to: message.payload.headers.find(h => h.name === 'To').value,
                date: message.payload.headers.find(h => h.name === 'Date').value,
                read: message.labelIds.includes('UNREAD'),
                starred: message.labelIds.includes('STARRED'),
                labels: message.labelIds
            })
            return msg
            const mainElement = document.getElementById('main');
            const messageElement = document.createElement('div');
            // messageElement.textContent = snippet;
            messageElement.innerHTML = `<strong>Snippet:</strong> ${snippet}<br><strong>Body:</strong> ${body}`;
            mainElement.appendChild(messageElement);
        }

        export {
            gapiLoaded,
            gisLoaded,
            handleAuthClick,
            handleSignoutClick,
            listLabels,
            listMessages,
            showMessage
        };