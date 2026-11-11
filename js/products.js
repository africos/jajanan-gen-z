/**
 * DATA PRODUK & INFORMASI TOKO
 * Jajanan Gen-Z Lumer (@donkus_lumerr26)
 */

const STORE_CONFIG = {
    brandName: "Jajanan Gen-Z Lumer",
    brandSubtitle: "Jajanan Pedas, Manis & Refreshing Drinks",
    tagline: "Dari Manis Lumer Sampai Pedas Pedas Manja — Teman Ngemil & Nongkrong Seharian!",
    whatsappNumber: "62895428168621",
    whatsappDisplay: "0895 4281 68621",
    instagramHandle: "@donkus_lumerr26",
    instagramUrl: "https://www.instagram.com/donkus_lumerr26?igsh=MWw0dnM4ZHZydDNjcg==",
    googleFormUrl: "https://forms.gle/dvMgWvhVw2QyhV399",
    trialStoreAddress: "Jajanan Gen-Z Lumer: Jl. Sudirman, Desa Kepenuhan Hulu, Lokasi Pengambilan Pesanan Takeaway",
    operationalHours: "14.00 - 22.00",
    bankAccounts: [
        { bank: "BCA", number: "8691823901", holder: "Jajanan Gen-Z Lumer", icon: "credit-card" },
        { bank: "BRI", number: "012301098765502", holder: "Jajanan Gen-Z Lumer", icon: "credit-card" },
        { bank: "DANA / GoPay", number: "0895428168621", holder: "Jajanan Gen-Z Lumer", icon: "smartphone" },
        { bank: "QRIS All Payment", number: "Scan QR saat Checkout", holder: "Jajanan Gen-Z Lumer (NMID Ready)", icon: "qr-code" }
    ],
    teamMembers: [
        { name: "Africo", role: "Team Leader & Product Development", desc: "Peracik resep donkus lumer dan pengawas cita rasa premium." },
        { name: "Hafdullah", role: "Marketing & Digital Strategy", desc: "Pengelola konten kreatif dan strategi pertumbuhan Gen-Z." },
        { name: "Sukyman", role: "Head of Operations & Logistics", desc: "Memastikan higienitas dapur dan kelancaran produksi harian." },
        { name: "Sri Rahayu", role: "Finance & Quality Control", desc: "Mengatur tata kelola keuangan dan standarisasi bahan baku." },
        { name: "Sabri", role: "Customer Experience & WA Admin", desc: "Siaga melayani chat pemesanan dan pengantaran pelanggan." },
        { name: "Efri", role: "Branding, Packaging & Visual", desc: "Mendesain kemasan jajanan kekinian estetik dan pengalaman unboxing." }
    ]
};

const PRODUCTS = [
    {
        id: "Pecinta Oreo Wajib Merapat!",
        name: "DONKUS LUMER CUP BESAR (Oreo Tiramisu)",
        category: "donkus",
        categoryLabel: "Donat Kukus Lumer",
        price: 15000,
        originalPrice: 18000,
        stock: 5,
        maxStock: 25,
        rating: 4.9,
        reviewsCount: 148,
        badge: "Best Seller ⭐",
        image: "images/tek6.jpeg",
        description: "Perpaduan lumeran glaze coklat premium dan glaze tiramisu yang creamy, ditimbun remahan Oreo melimpah ruah di atas donkus super lembut. Double sensasi manis dan renyah di setiap suapan!",
        highlights: ["100% Cokelat Belgia Lumer", "Tekstur Super Lembut", "Topping Oreo", "Fresh Tiap Pagi"]
    },
    {
        id: "Choco-Cheese Heaven yang Hakiki!",
        name: "DONKUS LUMER CUP BESAR (Choco Cheese)",
        category: "donkus",
        categoryLabel: "Donat Kukus Lumer",
        price: 16000,
        originalPrice: 20000,
        stock: 4,
        maxStock: 20,
        rating: 4.9,
        reviewsCount: 122,
        badge: "Paling Laris 🔥",
        image: "images/tek5.jpeg",
        description: "Kolaborasi epik manisnya coklat premium dengan gurihnya keju parut gondrong yang super royal. Kombinasi manis-gurih pas yang bikin lidah kamu berdansa gak mau berhenti!",
        highlights: ["Manisnya coklat premium", "Taburan Keju Parut Melimpah", "Gurih Manisnya Pas", "Favorit Gen-Z"]
    },
    {
        id: "donkus-matcha-keju-choco",
        name: "DONKUS LUMER CUP BESAR (Matcha Choco Cheese)",
        category: "donkus",
        categoryLabel: "Donat Kukus Lumer",
        price: 16000,
        originalPrice: 19000,
        stock: 6,
        maxStock: 18,
        rating: 4.8,
        reviewsCount: 95,
        badge: "Favorit Matcha 🍵",
        image: "images/tek4.jpeg",
        description: "Green tea matcha Uji Jepang asli dengan rasa bittersweet yang seimbang, dibalur saus matcha hangat kental nan lumer dan taburan choco chips.",
        highlights: ["Pure Japanese Matcha", "Tidak Terlalu Manis", "White Choco chips", "Harum Wangi Teh"]
    },
    {
        id: "donkus-red-velvet",
        name: "Donkus Red Velvet Cream Cheese",
        category: "donkus",
        categoryLabel: "Donat Kukus Lumer",
        price: 17000,
        originalPrice: 20000,
        stock: 3,
        maxStock: 15,
        rating: 5.0,
        reviewsCount: 110,
        badge: "Stok Menipis! ⚡",
        image: "images/tek3.jpeg",
        description: "Bolu kukus merah merona harum cokelat vanila disiram saus Cream Cheese New Zealand asin manis creamy lumer.",
        highlights: ["Cream Cheese Premium", "Taburan Red Velvet Crumb", "Sensasi Asin Manis Gurih", "Mewah & Elegan"]
    },
    {
        id: "donkus-taro-milky",
        name: "Donkus Taro Milky Delight",
        category: "donkus",
        categoryLabel: "Donat Kukus Lumer",
        price: 15000,
        originalPrice: 18000,
        stock: 7,
        maxStock: 20,
        rating: 4.8,
        reviewsCount: 78,
        badge: "Warna Cantik 💜",
        image: "images/tek1.jpeg",
        description: "Saus ubi ungu taro manis creamy toping choco chips gurih, lumer memanjakan lidah di setiap gigitan.",
        highlights: ["Aroma Taro Khas", "choco chips gurih", "Warna Ungu Estetik", "Cocok untuk Story IG"]
    },
    {
        id: "aneka-donkus-mini",
        name: "DONKUS LUMER CUP MINI",
        category: "donkus",
        categoryLabel: "Donat Kukus Lumer",
        price: 7000,
        originalPrice: 8000,
        stock: 10,
        maxStock: 15,
        rating: 4.9,
        reviewsCount: 89,
        badge: "Super Cheesy 🧀",
        image: "images/tek2.jpeg",
        description: "Lihat deh warna-warninya! Ada rasa Tiramisu yang mewah, Coklat premium yang pekat, hingga Stroberi yang menyegarkan. Dipadukan dengan toping melimpah seperti Oreo, Keju parut, hingga Red Velvet crumble. Dijamin puas!",
        highlights: ["Banyak Aneka toping", "Bisa Mix Toping", "Gurih Manis Pas", "Bikin Kenyang"]
    },
    {
        id: "Choco-Matcha Crunchy Blend!",
        name: "GABIN FLA SUSU LUMER (Choco Matcha)",
        category: "gabin",
        categoryLabel: "Gabin Fla Susu Lumer",
        price: 10000,
        originalPrice: 12000,
        stock: 8,
        maxStock: 25,
        rating: 4.9,
        reviewsCount: 165,
        badge: "Hemat 15% 🏷️",
        image: "images/tek11.jpeg",
        description: "Nikmati sensasi kriuknya biskuit gabin berpadu manisnya siraman glaze coklat premium, ditambah gurihnya crumble matcha dan cantiknya sprinkles warna-warni. Kombinasi rasa dan visual tercantik yang wajib dicoba!",
        highlights: ["Bisa Mix 2 Varian Rasa", "Banyak Varian Toping", "Kriuk Gurih Manis"]
    },
    {
        id: "Mewahnya Sensasi Red Velvet!",
        name: "GABIN FLA SUSU LUMER (Red Velvet)",
        category: "gabin",
        categoryLabel: "Gabin Fla Susu Lumer",
        price: 10000,
        originalPrice: 12000,
        stock: 8,
        maxStock: 12,
        rating: 5.0,
        reviewsCount: 204,
        badge: "Jajanan Kekinian Premium 🎁",
        image: "images/tek10.jpeg",
        description: "Perpaduan sempurna gurihnya fla susu buatan sendiri dengan siraman glaze susu putih premium yang creamy nan manis, ditimbun remahan Red Velvet crumble mewah melimpah. Sekali gigit langsung jatuh cinta!",
        highlights: ["Bisa Mix 2 Varian Rasa", "Banyak Varian Toping", "Varian Komplit"]
    },
    {
        id: "mini-donat-pancake",
        name: "MINI DONAT PANCAKE",
        category: "pancake",
        categoryLabel: "Mini Donat Pancake",
        price: 13000,
        originalPrice: 15000,
        stock: 10,
        maxStock: 18,
        rating: 4.9,
        reviewsCount: 135,
        badge: "Fudgy & Melty 🍫",
        image: "images/tek12.jpeg",
        description: "Pancake mini berbentuk donat yang super montok dan lembut, diselimuti tebalnya glaze strawberry pink manis yang segar wangi, serta ditaburi renyahnya rainbow sprinkles warna-warni yang estetik banget. Cocok buat nemenin harimu biar makin ceria!",
        highlights: ["Si Imut Pinky yang Bikin Gemes!", "Lembut & Manis", "Glaze Strawberry Tebal"]
    },
    {
        id: "gabin-fla-bites",
        name: "GABIN FLA BITES",
        category: "gabin",
        categoryLabel: "Gabin Fla Bites",
        price: 10000,
        originalPrice: 13000,
        stock: 3,
        maxStock: 15,
        rating: 4.8,
        reviewsCount: 88,
        badge: "Stok Menipis! ⚡",
        image: "images/gabin-fla-bites.jpeg",
        description: "Nikmati sensasi biskuit gabin renyah isi fla susu lembut buatan sendiri, disiram glaze cokelat premium melimpah dan ditaburi remahan Oreo pekat serta rainbow sprinkles warna-warni yang estetik. Perpaduan rasa manis-gurih dan visual cantik yang siap mencerahkan harimu!",
        highlights: ["Biskuit gabin renyah di luar", "Isian fla susu lembut lumer", "Tekstur unik di setiap gigitan"]
    },
    {
        id: "Lezat, Renyah, & Padat!",
        name: "MARTEL (Martabak Telor)",
        category: "martel",
        categoryLabel: "Martabak Telor",
        price: 5000,
        originalPrice: 10000,
        stock: 15,
        maxStock: 20,
        rating: 4.9,
        reviewsCount: 172,
        badge: "Gurih Lumer 🥓",
        image: "images/martel.jpeg",
        description: "Nikmati kelezatan Martabak Telor rumahan dengan isian yang padat, lapisan luar yang renyah sempurna, serta disajikan lengkap dengan saus sambal dan ketchup pilihan yang menggugah selera. Camilan gurih pas di kantong yang cocok untuk teman santai kapan saja!",
        highlights: ["Isian padat gurih renyah", "Lengkap saus sambal & ketchup", "Goreng dadakan hangat"]
    },
    {
        id: "Lezat, Lembut, & Hangat!",
        name: "Pangsit Rebus Chili Oil",
        category: "pangsit",
        categoryLabel: "Pangsit Rebus",
        price: 10000,
        originalPrice: 15000,
        stock: 15,
        maxStock: 20,
        rating: 4.9,
        reviewsCount: 172,
        badge: "Pedas Nagih 🌶️",
        image: "images/pangsit-rebus.jpeg",
        description: "Kulit pangsit lembut berisi isian gurih padat yang direbus pas, lalu dibalur dengan racikan chili oil pedas gurih yang kaya rempah. Sangat cocok untuk penggemar makanan hangat dan pedas!",
        highlights: ["Kulit kenyal lembut", "Isian ayam gurih padat", "Chili oil rempah melimpah"]
    },
    {
        id: "Lezat, Renyah, & Hangat!",
        name: "Pangsit Goreng Chili Oil",
        category: "pangsit",
        categoryLabel: "Pangsit Goreng",
        price: 10000,
        originalPrice: 15000,
        stock: 15,
        maxStock: 20,
        rating: 4.9,
        reviewsCount: 172,
        badge: "Super Renyah 🥟",
        image: "images/pangsit-goreng.jpeg",
        description: "Kulit pangsit renyah keemasan dengan isian padat gurih, disiram dengan chili oil pedas harum khas rumahan dan taburan potongan pangsit mini renyah serta daun bawang segar. Sensasi pedas-gurihnya bikin ketagihan!",
        highlights: ["Pangsit goreng renyah kriuk", "Taburan krispi & daun bawang", "Chili oil pedas wangi"]
    },
    {
        id: "minuman-cappucino",
        name: "Ice Cappuccino",
        category: "minuman",
        categoryLabel: "Minuman Segar",
        price: 5000,
        originalPrice: 6000,
        stock: 25,
        maxStock: 30,
        rating: 4.8,
        reviewsCount: 64,
        badge: "Segar Banget 🥤",
        image: "images/minuman-capucino.jpeg",
        description: "Perpaduan pas antara kepekatan kopi pilihan dan kelembutan susu segar yang disajikan dingin dengan es batu. Menghadirkan rasa yang creamy, menyegarkan, dan membangkitkan semangatmu seharian!",
        highlights: ["Kopi creamy nikmat", "Es batu dingin menyegarkan", "Teman pas jajanan lumer"]
    },
    {
        id: "minuman-redvelvet",
        name: "Ice Red Velvet",
        category: "minuman",
        categoryLabel: "Minuman Segar",
        price: 5000,
        originalPrice: 6000,
        stock: 25,
        maxStock: 30,
        rating: 4.8,
        reviewsCount: 64,
        badge: "Segar Banget 🥤",
        image: "images/minuman-redvelved.jpeg",
        description: "Minuman kekinian dengan warna merah muda yang menggugah selera. Memiliki cita rasa manis yang khas, lembut, dan milky di setiap sedotannya, pas banget buat kamu pencinta minuman manis yang estetik!",
        highlights: ["Karakter rasa red velvet khas", "Manis lembut milky", "Warna estetik kekinian"]
    }
];

// Helper Formatter Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Helper Status Stok Harian
function getStockBadgeInfo(stock, maxStock) {
    const percentage = Math.round((stock / maxStock) * 100);
    if (stock <= 0) {
        return {
            status: "soldout",
            label: "Stok Habis (PO Besok)",
            colorClass: "bg-red-500/10 text-red-600 border-red-200",
            barClass: "bg-red-500",
            icon: "alert-circle",
            percentage: 0
        };
    } else if (stock <= 3) {
        return {
            status: "critical",
            label: `Sisa ${stock} Box Hari Ini!`,
            colorClass: "bg-amber-500/15 text-amber-700 border-amber-300 animate-pulse",
            barClass: "bg-amber-500",
            icon: "flame",
            percentage: percentage
        };
    } else if (stock <= 6) {
        return {
            status: "warning",
            label: `Tersisa ${stock} Box`,
            colorClass: "bg-orange-500/10 text-orange-700 border-orange-200",
            barClass: "bg-orange-500",
            icon: "clock",
            percentage: percentage
        };
    } else {
        return {
            status: "available",
            label: `Stok Tersedia (${stock} Box)`,
            colorClass: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
            barClass: "bg-emerald-500",
            icon: "check-circle",
            percentage: percentage
        };
    }
}
