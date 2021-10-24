// DOM elements
const inputEl = document.querySelectorAll('.form-control');
const buttonEl = document.querySelectorAll('.btn-primary');
const valueTextEl = document.getElementById('value-result');
const stringTextEl = document.getElementById('string-result');

// Models
class AsyncContract {
  constructor(GET, POST) {
    this.GET = GET;
    this.POST = POST;
  }
}

// env variables
const adress = '0x6b5074C1f15accD2833150cd1D35B3a70e3D5c84';
const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_myString',
        type: 'string',
      },
    ],
    name: 'setString',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_myValue',
        type: 'uint256',
      },
    ],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'myString',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'myValue',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const sendingAdress = '0x49b957fCCefE41d51FeE98D136660D7173218ae7';

const web3 = new Web3('http://localhost:7545');

const contract = new web3.eth.Contract(abi, adress);

let value = '';
let stringValue = '';

const valueAsync = new AsyncContract('myValue', 'setValue');
const stringAsync = new AsyncContract('myString', 'setString');

const allContractCalls = [valueAsync, stringAsync];

// Methods
const updateContract = async (method, val) => {
  try {
    if (!method || !val) throw new Error('No method or value provided.');

    const { GET, POST } = method;

    if (!GET || !POST) throw new Error('No Get or Post provided.');

    await contract.methods[POST](val).send({ from: sendingAdress });

    const response = await contract.methods[GET]().call();

    if (GET.toLowerCase().includes('value')) {
      addListItem(response, valueTextEl);
      value = '';
    } else {
      addListItem(response, stringTextEl);
      stringValue = '';
    }
  } catch (err) {
    console.error(err);
  }
};

const getContract = async ({ GET }) => {
  try {
    const response = await contract.methods[GET]().call();

    addListItem(
      response,
      GET.toLowerCase().includes('value') ? valueTextEl : stringTextEl
    );
  } catch (err) {
    console.error(err);
  }
};

const addListItem = (value, el) => {
  el.innerHTML = value;
};

// Events
allContractCalls.forEach((contractCall) => {
  getContract(contractCall);
});

inputEl.forEach((el) => {
  el.addEventListener('input', (e) => {
    const { id } = el;
    if (id === 'value') {
      value = e.target.value;
    } else {
      stringValue = e.target.value;
    }
  });
});

buttonEl.forEach((btn) => {
  const { id } = btn;

  btn.addEventListener('click', () => {
    if (id === 'value-btn') {
      updateContract(valueAsync, parseInt(value));
    } else {
      updateContract(stringAsync, stringValue);
    }
  });
});
