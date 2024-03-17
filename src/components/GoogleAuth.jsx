import { useEffect } from 'react';

const GoogleSignInButton = () => {
    useEffect(() => {
        const initializeGoogleSignIn = async () => {
            try {
                const GOOGLE_ID = "338363137579-kj4ju1db0bo3q80l1atkhikghrggd868.apps.googleusercontent.com";
                // Initialize Google accounts API
                google.accounts.id.initialize({
                    client_id: GOOGLE_ID,
                    callback: handleCredentialResponse,
                });
                // Find signGoogleDiv and render Google sign-in button
                const signGoogleDiv = document.getElementById("signGoogleDiv");
                if (signGoogleDiv) {
                    google.accounts.id.renderButton(
                        signGoogleDiv,
                        {
                            theme: "outline",
                            size: "medium",
                            background: "white",
                            width: '100%',
                            logo_alignment: "center"
                        }
                    );
                }
                else {
                    console.error("Unable to find 'signGoogleDiv' element.");
                }

                // Prompt One Tap dialog
                google.accounts.id.prompt();
            } catch (error) {
                console.error("Error initializing Google sign-in:", error);
            }
        };
        initializeGoogleSignIn();

    }, []);

    const verifyGoogleOAuthToken = async (userRes) => {
        const accessToken = userRes.credential;
        let formData = new FormData();
        formData.append('credential', accessToken);
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/general/verifygoogletoken`, {
                method: 'POST',
                body: formData
            })

            let tokenStatus = await response.json();
            console.log('Token Status', tokenStatus);
        } catch (error) {
            alert(error);
        }
    }

    const handleCredentialResponse = async (response) => {
        console.log("Google sign-in response:", response);
        // Handle the credential response here if needed
        await verifyGoogleOAuthToken(response);
    };

    return <div id="signGoogleDiv"></div>;
};

export default GoogleSignInButton;