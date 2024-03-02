<script src="https://cdn.jsdelivr.net/npm/ethers@5.6/dist/ethers.umd.min.js"></script>

<script>
const loginButton = document.getElementById('loginButton');

const statusDiv = document.getElementById('status');

async function signInWithMetaMask() {
    console.log("sign in")
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            statusDiv.innerHTML = `Connected with <b>${account}</b>`;
        } catch (error) {
            statusDiv.innerHTML = `Error: ${error.message}`;
        }
    } else {
        statusDiv.innerHTML = 'MetaMask is not installed. Please install it to use this app.';
    }
}

loginButton.addEventListener('click', signInWithMetaMask);
   

function tuneIn() {
    alert('Tune In button clicked.');
}

function openYourMind() {
    alert('Open Your Mind button clicked.');
}

</script>