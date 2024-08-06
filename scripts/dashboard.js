import { auth, signOut, onAuthStateChanged, db, collection, addDoc, serverTimestamp, getDocs, onSnapshot } from "./firebase.js";
import { formatDistance } from "date-fns";

const btn = document.querySelector("#logout_btn");
const useremail = document.querySelector("#user_email");
const form = document.querySelector("#product-form");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDetail = document.querySelector("#product-detail");
const allProducts = document.querySelector(".all-products");

const myCollectionReference = collection(db, "products");

// Authentication state change handler
onAuthStateChanged(auth, (user) => {
    if (user) {
        useremail.innerText = user.email;
    } else {
        window.location.href = "./login.html"; 
    }
});

// Logout button event listener
btn.addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("Sign-out successful");
    } catch (error) {
        console.error("Error signing out: ", error);
    }
});

// Form submit event listener
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic validation
    if (!productName.value || !productPrice.value || !productDetail.value) {
        alert("Please fill in all fields");
        return;
    }

    const myProduct = {
        productName: productName.value,
        productPrice: Number(productPrice.value),
        productDetail: productDetail.value,
        createdAt: serverTimestamp(),
    };

    try {
        await addDoc(myCollectionReference, myProduct);
        console.log("Document added successfully");
        form.reset(); // Clear form fields
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Function to render products
async function renderProducts() {
    try {
        const querySnapshot = await getDocs(myCollectionReference);
        allProducts.innerHTML = ""; // Clear existing products

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const date = product.createdAt
                ? formatDistance(product.createdAt.toDate(), new Date(), { addSuffix: true })
                : "";

            allProducts.innerHTML += `
                <div>
                    <h3>${product.productName}</h3>
                    <span>${date}</span>
                    <p class="price">Rs.${product.productPrice}</p>
                    <p>${product.productDetail}</p>
                </div>`;
        });
    } catch (e) {
        console.error("Error fetching documents: ", e);
    }
}

// Initial products render
renderProducts();

// Real-time updates with onSnapshot
onSnapshot(myCollectionReference, (querySnapshot) => {
    allProducts.innerHTML = ""; // Clear existing products

    querySnapshot.forEach((doc, index) => {
        const product = doc.data();
        const date = product.createdAt
            ? formatDistance(product.createdAt.toDate(), new Date(), { addSuffix: true })
            : "";

        allProducts.innerHTML += `
            <div>
                ${index + 1}
                <h3>${product.productName}</h3>
                <span>${date}</span>
                <p class="price">Rs.${product.productPrice}</p>
                <p>${product.productDetail}</p>
            </div>`;
    });
});
