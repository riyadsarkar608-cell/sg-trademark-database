// তোমার প্রজেক্ট আইডি দিয়ে তৈরি করা অফিশিয়াল সুপাবেস URL
const SUPABASE_URL = "https://ulqxglfjjqnvqnyhqvsb.supabase.co";

// ⚠️ এখানে তোমার সুপাবেস ড্যাশবোর্ড থেকে পাওয়া লম্বা Anon Key-টি বসাবে
const SUPABASE_ANON_KEY = "sb_publishable_tCiDdIVN5_Pg8VpjjrQBzg_-WISTH2_
";

// সুপাবেস ক্লায়েন্ট তৈরি
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// স্ক্রিনের এলিমেন্টগুলো সিলেক্ট করা
const loginSection = document.getElementById('login-section');
const databaseSection = document.getElementById('database-section');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// ইউজার লগইন অবস্থায় আছে কি না তা চেক করার ফাংশন
async function checkUserSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        // লগইন থাকলে ডাটাবেজ দেখাবে, লগইন ফর্ম লুকিয়ে ফেলবে
        loginSection.classList.add('hidden');
        databaseSection.classList.remove('hidden');
    } else {
        // লগইন না থাকলে লগইন ফর্ম দেখাবে, ডাটাবেজ লুকিয়ে রাখবে
        loginSection.classList.remove('hidden');
        databaseSection.classList.add('hidden');
    }
}

// লগইন সাবমিট হ্যান্ডলার (ইউজার যখন Sign In বাটনে চাপ দেবে)
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("লগইন ব্যর্থ হয়েছে: " + error.message);
    } else {
        alert("লগইন সফল হয়েছে! ডাটাবেজে স্বাগতম।");
        checkUserSession(); // স্ক্রিন আপডেট করার জন্য
    }
});

// লগআউট হ্যান্ডলার (ইউজার যখন Logout বাটনে চাপ দেবে)
logoutBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        alert("লগআউট করা হয়েছে!");
        checkUserSession();
    }
});

// পেজ লোড হওয়ার সাথে সাথে সেশন চেক হবে
checkUserSession();
