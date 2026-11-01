/**
 * APLIKASI UTAMA - JAJANAN GEN-Z LUMER
 * Interaksi Keranjang, Pemesanan WhatsApp, Google Form, Filter & Modal
 */

// State Aplikasi
const state = {
    cart: [],
    selectedCategory: 'all',
    searchQuery: '',
    pickupMethod: 'takeaway', // 'takeaway' | 'delivery'
    customerInfo: {
        name: '',
        phone: '',
        address: '',
        pickupTime: '11:00 - 13:00 (Batch Siang Fresh)',
        notes: ''
    }
};

// Helper Panggil Lucide Icons Aman
function safeCreateIcons() {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        try {
            lucide.createIcons();
        } catch (e) {
            console.warn('Lucide icon render error:', e);
        }
    }
}

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderProducts();
    updateCartUI();
    initEventListeners();
    initLiveTicker();
    safeCreateIcons();
});

// Load cart dari localStorage dengan validasi data aman
function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem('donkus_cart');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && typeof PRODUCTS !== 'undefined') {
                // Pastikan item produk masih valid sesuai data produk terkini
                state.cart = parsed.filter(item => item && item.product && PRODUCTS.some(p => p.id === item.product.id));
            } else {
                state.cart = [];
            }
        }
    } catch (e) {
        console.error('Gagal membaca keranjang dari penyimpanan lokal', e);
        state.cart = [];
    }
}

// Simpan cart ke localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('donkus_cart', JSON.stringify(state.cart));
    } catch (e) {
        console.error('Gagal menyimpan keranjang', e);
    }
}

// Render Produk ke Grid Katalog
function renderProducts() {
    const gridContainer = document.getElementById('products-grid');
    if (!gridContainer) return;

    let filtered = PRODUCTS.filter(prod => {
        const matchesCategory = 
            state.selectedCategory === 'all' || 
            (state.selectedCategory === 'bestseller' && prod.badge.includes('Best')) ||
            prod.category === state.selectedCategory;
        
        const matchesSearch = 
            prod.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            prod.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            prod.categoryLabel.toLowerCase().includes(state.searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        gridContainer.innerHTML = `
            <div class="col-span-full py-16 text-center">
                <div class="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                    <i data-lucide="package-search" class="w-10 h-10"></i>
                </div>
                <h3 class="text-xl font-bold text-stone-800 mb-2">Menu yang Dicari Tidak Ditemukan</h3>
                <p class="text-stone-500 max-w-md mx-auto text-sm">Coba kata kunci lain atau pilih kategori seperti Donat Kukus Lumer atau Paket Hampers.</p>
                <button onclick="resetFilters()" class="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition shadow-md shadow-amber-600/20">
                    <i data-lucide="refresh-cw" class="w-4 h-4"></i> Tampilkan Semua Menu
                </button>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    gridContainer.innerHTML = filtered.map(product => {
        // Cek jumlah yang sudah ada di keranjang untuk kurangi stok tampilan
        const itemInCart = state.cart.find(item => item.product.id === product.id);
        const currentQtyInCart = itemInCart ? itemInCart.quantity : 0;
        const availableStock = Math.max(0, product.stock - currentQtyInCart);
        const stockInfo = getStockBadgeInfo(availableStock, product.maxStock);

        return `
            <div class="product-card group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                    <!-- Badge Diskon & Kategori -->
                    <div class="relative overflow-hidden aspect-[4/3] bg-stone-100">
                        <img 
                            src="${product.image}" 
                            alt="${product.name}" 
                            loading="lazy"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onerror="this.src='images/tek6.jpeg'"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                        
                        <!-- Badges -->
                        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                                product.badge.includes('Best') 
                                    ? 'bg-amber-500 text-white' 
                                    : product.badge.includes('Menipis') 
                                    ? 'bg-red-500 text-white animate-pulse' 
                                    : 'bg-stone-900/80 text-white'
                            }">
                                ${product.badge}
                            </span>
                        </div>

                        <!-- Quick View Button -->
                        <button 
                            onclick="openProductDetail('${product.id}')"
                            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-amber-600 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-90 group-hover:opacity-100"
                            title="Detail Rasa & Komposisi"
                        >
                            <i data-lucide="eye" class="w-4 h-4"></i>
                        </button>

                        <!-- Tag Kategori Bawah Foto -->
                        <div class="absolute bottom-2.5 left-3 text-white/90 text-xs font-medium flex items-center gap-1">
                            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
                            <span>${product.categoryLabel}</span>
                        </div>
                    </div>

                    <!-- Detail Konten -->
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-1.5 text-xs text-stone-500">
                            <span class="flex items-center text-amber-500 font-semibold">
                                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1"></i>
                                ${product.rating}
                            </span>
                            <span>•</span>
                            <span>${product.reviewsCount} Ulasan Puas</span>
                        </div>

                        <h3 class="font-bold text-stone-800 text-lg group-hover:text-amber-600 transition-colors line-clamp-1 mb-1.5" title="${product.name}">
                            ${product.name}
                        </h3>

                        <p class="text-stone-600 text-xs line-clamp-2 leading-relaxed mb-3">
                            ${product.description}
                        </p>

                        <!-- Indikator Stok Harian (Requirement Khusus) -->
                        <div class="p-2.5 rounded-xl border ${stockInfo.colorClass} mb-4">
                            <div class="flex items-center justify-between text-xs font-semibold mb-1">
                                <span class="flex items-center gap-1">
                                    <i data-lucide="${stockInfo.icon}" class="w-3.5 h-3.5"></i>
                                    <span>${stockInfo.label}</span>
                                </span>
                                <span class="text-[11px] opacity-80">${stockInfo.percentage}% sisa batch</span>
                            </div>
                            <div class="w-full bg-stone-200/60 rounded-full h-1.5 overflow-hidden">
                                <div class="${stockInfo.barClass} h-1.5 rounded-full transition-all duration-500" style="width: ${stockInfo.percentage}%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Card: Harga & Tombol Pesan -->
                <div class="p-5 pt-0 mt-auto border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                        <div class="text-[11px] text-stone-400 line-through">
                            ${product.originalPrice ? formatRupiah(product.originalPrice) : ''}
                        </div>
                        <div class="text-lg font-black text-amber-600">
                            ${formatRupiah(product.price)}
                        </div>
                    </div>

                    <button 
                        onclick="addToCart('${product.id}')"
                        ${availableStock <= 0 ? 'disabled' : ''}
                        class="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                            availableStock <= 0 
                                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
                        }"
                    >
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        <span>${availableStock <= 0 ? 'Habis' : 'Tambah'}</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    lucide.createIcons();
}

// Reset filter
function resetFilters() {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    // Update active tab buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === 'all') {
            btn.classList.add('bg-stone-900', 'text-white', 'shadow-md');
            btn.classList.remove('bg-white', 'text-stone-700', 'border');
        } else {
            btn.classList.remove('bg-stone-900', 'text-white', 'shadow-md');
            btn.classList.add('bg-white', 'text-stone-700', 'border');
        }
    });

    renderProducts();
}

// Tambah item ke keranjang
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.product.id === productId);
    const currentQtyInCart = existingIndex > -1 ? state.cart[existingIndex].quantity : 0;

    if (currentQtyInCart >= product.stock) {
        showToast(`Stok ${product.name} untuk hari ini hanya tersisa ${product.stock} box!`, 'warning');
        return;
    }

    if (existingIndex > -1) {
        state.cart[existingIndex].quantity += 1;
    } else {
        state.cart.push({
            product: product,
            quantity: 1,
            notes: ''
        });
    }

    saveCartToStorage();
    renderProducts();
    updateCartUI();
    showToast(`✓ ${product.name} berhasil ditambahkan ke keranjang!`, 'success');
}

// Ubah kuantitas di keranjang
function updateCartQuantity(productId, delta) {
    const itemIndex = state.cart.findIndex(item => item.product.id === productId);
    if (itemIndex === -1) return;

    const item = state.cart[itemIndex];
    const newQty = item.quantity + delta;

    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }

    if (newQty > item.product.stock) {
        showToast(`Maksimal pesanan sesuai stok harian: ${item.product.stock} box`, 'warning');
        return;
    }

    item.quantity = newQty;
    saveCartToStorage();
    renderProducts();
    updateCartUI();
}

// Hapus item dari keranjang
function removeFromCart(productId) {
    const item = state.cart.find(i => i.product.id === productId);
    state.cart = state.cart.filter(item => item.product.id !== productId);
    saveCartToStorage();
    renderProducts();
    updateCartUI();
    if (item) {
        showToast(`${item.product.name} dihapus dari keranjang`, 'info');
    }
}

// Update catatan per item di keranjang
function updateItemNotes(productId, notesText) {
    const item = state.cart.find(i => i.product.id === productId);
    if (item) {
        item.notes = notesText;
        saveCartToStorage();
    }
}

// Kosongkan Keranjang
function clearCart() {
    if (state.cart.length === 0) return;
    if (confirm("Apakah kamu yakin ingin mengosongkan keranjang belanja?")) {
        state.cart = [];
        saveCartToStorage();
        renderProducts();
        updateCartUI();
        showToast("Keranjang telah dikosongkan.", "info");
    }
}

// Update Tampilan Keranjang (Badge Counter & Modal Isi)
function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    // Update Floating Badge & Header Badge
    document.querySelectorAll('.cart-count-badge').forEach(el => {
        el.textContent = totalCount;
        el.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartFilledState = document.getElementById('cart-filled-state');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');

    if (!cartItemsList) return;

    if (totalCount === 0) {
        if (cartEmptyState) cartEmptyState.classList.remove('hidden');
        if (cartFilledState) cartFilledState.classList.add('hidden');
        cartItemsList.innerHTML = '';
        return;
    }

    if (cartEmptyState) cartEmptyState.classList.add('hidden');
    if (cartFilledState) cartFilledState.classList.remove('hidden');

    cartItemsList.innerHTML = state.cart.map(item => `
        <div class="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 flex gap-3 items-start">
            <img 
                src="${item.product.image}" 
                alt="${item.product.name}" 
                class="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-stone-200"
            />
            <div class="flex-grow min-w-0">
                <div class="flex justify-between items-start gap-2">
                    <h4 class="font-bold text-stone-800 text-sm truncate">${item.product.name}</h4>
                    <button onclick="removeFromCart('${item.product.id}')" class="text-stone-400 hover:text-red-500 transition p-0.5">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
                <div class="text-xs font-semibold text-amber-600 mb-2">
                    ${formatRupiah(item.product.price)}
                </div>

                <div class="flex items-center justify-between gap-2">
                    <!-- Quantity Stepper -->
                    <div class="inline-flex items-center bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs">
                        <button onclick="updateCartQuantity('${item.product.id}', -1)" class="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition">
                            <i data-lucide="minus" class="w-3 h-3"></i>
                        </button>
                        <span class="w-8 text-center text-xs font-bold text-stone-800">${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.product.id}', 1)" class="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition">
                            <i data-lucide="plus" class="w-3 h-3"></i>
                        </button>
                    </div>

                    <!-- Subtotal Item -->
                    <div class="text-xs font-bold text-stone-700">
                        ${formatRupiah(item.product.price * item.quantity)}
                    </div>
                </div>

                <!-- Input Catatan Opsional -->
                <div class="mt-2">
                    <input 
                        type="text" 
                        placeholder="Catatan (misal: lelehan dipisah/kurang manis)" 
                        value="${item.notes || ''}" 
                        onchange="updateItemNotes('${item.product.id}', this.value)"
                        class="w-full text-[11px] px-2.5 py-1 bg-white rounded border border-stone-200 focus:outline-none focus:border-amber-500"
                    />
                </div>
            </div>
        </div>
    `).join('');

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatRupiah(totalPrice);
    if (cartTotalEl) cartTotalEl.textContent = formatRupiah(totalPrice);

    lucide.createIcons();
}

// Buka Tutup Drawer Keranjang
function toggleCart(forceOpen) {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    const isOpen = !drawer.classList.contains('translate-x-full');
    const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

    if (shouldOpen) {
        drawer.classList.remove('translate-x-full');
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.add('translate-x-full');
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    }
}

// Buka Modal Detail Produk
function openProductDetail(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-detail-modal');
    const content = document.getElementById('product-detail-content');
    if (!modal || !content) return;

    const itemInCart = state.cart.find(item => item.product.id === product.id);
    const currentQtyInCart = itemInCart ? itemInCart.quantity : 0;
    const availableStock = Math.max(0, product.stock - currentQtyInCart);
    const stockInfo = getStockBadgeInfo(availableStock, product.maxStock);

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Gambar Produk -->
            <div class="relative rounded-2xl overflow-hidden aspect-square bg-stone-100 border border-stone-200">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="w-full h-full object-cover"
                />
                <span class="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold shadow-md">
                    ${product.badge}
                </span>
            </div>

            <!-- Detail & Informasi Rasa -->
            <div class="flex flex-col justify-between">
                <div>
                    <div class="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <span class="px-2 py-0.5 rounded bg-stone-100 font-semibold text-stone-700">${product.categoryLabel}</span>
                        <span>•</span>
                        <span class="flex items-center text-amber-500 font-bold">
                            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 mr-1"></i> ${product.rating} (${product.reviewsCount} Ulasan)
                        </span>
                    </div>

                    <h2 class="text-2xl font-black text-stone-900 mb-2">${product.name}</h2>

                    <div class="flex items-baseline gap-2 mb-4">
                        <span class="text-2xl font-black text-amber-600">${formatRupiah(product.price)}</span>
                        ${product.originalPrice ? `<span class="text-sm text-stone-400 line-through">${formatRupiah(product.originalPrice)}</span>` : ''}
                    </div>

                    <p class="text-stone-600 text-sm leading-relaxed mb-4">
                        ${product.description}
                    </p>

                    <!-- Keunggulan Rasa / Highlights -->
                    <div class="mb-5">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Keunggulan Varian Ini:</h4>
                        <div class="grid grid-cols-2 gap-2">
                            ${product.highlights.map(hl => `
                                <div class="flex items-center gap-2 text-xs text-stone-700 bg-amber-50/60 p-2 rounded-lg border border-amber-100/80">
                                    <i data-lucide="check" class="w-3.5 h-3.5 text-amber-600"></i>
                                    <span>${hl}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Stok Hari Ini -->
                    <div class="p-3 rounded-xl border ${stockInfo.colorClass} mb-4">
                        <div class="flex items-center justify-between text-xs font-semibold mb-1">
                            <span class="flex items-center gap-1.5">
                                <i data-lucide="${stockInfo.icon}" class="w-4 h-4"></i>
                                <span>${stockInfo.label}</span>
                            </span>
                            <span>Target: ${product.maxStock} box/hari</span>
                        </div>
                        <div class="w-full bg-stone-200/60 rounded-full h-2 overflow-hidden">
                            <div class="${stockInfo.barClass} h-2 rounded-full transition-all" style="width: ${stockInfo.percentage}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="pt-4 border-t border-stone-200 flex gap-3">
                    <button 
                        onclick="addToCart('${product.id}'); closeProductDetail();"
                        ${availableStock <= 0 ? 'disabled' : ''}
                        class="flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white shadow-lg ${
                            availableStock <= 0 
                                ? 'bg-stone-300 cursor-not-allowed' 
                                : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                        }"
                    >
                        <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                        <span>${availableStock <= 0 ? 'Stok Hari Ini Telah Habis' : 'Masukkan ke Keranjang'}</span>
                    </button>
                    <button 
                        onclick="closeProductDetail()" 
                        class="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-sm font-semibold transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeProductDetail() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Buka Modal Checkout Manual
function openCheckoutModal() {
    if (state.cart.length === 0) {
        showToast("Keranjang belanjamu masih kosong!", "warning");
        return;
    }

    toggleCart(false); // Tutup drawer keranjang
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    // Set nilai ringkasan pesanan di checkout
    const checkoutSummaryEl = document.getElementById('checkout-items-summary');
    const checkoutTotalEl = document.getElementById('checkout-grand-total');
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (checkoutSummaryEl) {
        checkoutSummaryEl.innerHTML = state.cart.map(item => `
            <div class="flex justify-between items-center text-xs py-1.5 border-b border-stone-100">
                <span class="text-stone-700 font-medium">${item.quantity}x ${item.product.name}</span>
                <span class="text-stone-900 font-bold">${formatRupiah(item.product.price * item.quantity)}</span>
            </div>
        `).join('');
    }

    if (checkoutTotalEl) {
        checkoutTotalEl.textContent = formatRupiah(totalPrice);
    }

    // Update opsi metode ambil
    setPickupMethod(state.pickupMethod);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Set Metode Pengambilan: Takeaway atau Delivery
function setPickupMethod(method) {
    state.pickupMethod = method;
    const btnTakeaway = document.getElementById('method-takeaway-btn');
    const btnDelivery = document.getElementById('method-delivery-btn');
    const takeawayDetails = document.getElementById('takeaway-details');
    const deliveryDetails = document.getElementById('delivery-details');

    if (method === 'takeaway') {
        if (btnTakeaway) {
            btnTakeaway.classList.add('border-amber-600', 'bg-amber-50/70', 'text-amber-800');
            btnTakeaway.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
        }
        if (btnDelivery) {
            btnDelivery.classList.remove('border-amber-600', 'bg-amber-50/70', 'text-amber-800');
            btnDelivery.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
        }
        if (takeawayDetails) takeawayDetails.classList.remove('hidden');
        if (deliveryDetails) deliveryDetails.classList.add('hidden');
    } else {
        if (btnDelivery) {
            btnDelivery.classList.add('border-amber-600', 'bg-amber-50/70', 'text-amber-800');
            btnDelivery.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
        }
        if (btnTakeaway) {
            btnTakeaway.classList.remove('border-amber-600', 'bg-amber-50/70', 'text-amber-800');
            btnTakeaway.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
        }
        if (takeawayDetails) takeawayDetails.classList.add('hidden');
        if (deliveryDetails) deliveryDetails.classList.remove('hidden');
    }
}

// BACA FORM DATA DARI INPUT CHECKOUT
function collectCheckoutForm() {
    const name = document.getElementById('checkout-name')?.value.trim();
    const phone = document.getElementById('checkout-phone')?.value.trim();
    const notes = document.getElementById('checkout-notes')?.value.trim();
    const pickupTime = document.getElementById('checkout-pickup-time')?.value;
    const address = document.getElementById('checkout-address')?.value.trim();

    if (!name) {
        showToast("Mohon masukkan Nama Lengkap kamu", "warning");
        document.getElementById('checkout-name')?.focus();
        return null;
    }

    if (!phone) {
        showToast("Mohon masukkan Nomor WhatsApp aktif kamu", "warning");
        document.getElementById('checkout-phone')?.focus();
        return null;
    }

    if (state.pickupMethod === 'delivery' && !address) {
        showToast("Mohon masukkan Alamat Pengantaran Lengkap", "warning");
        document.getElementById('checkout-address')?.focus();
        return null;
    }

    return {
        name,
        phone,
        notes,
        pickupTime,
        address,
        pickupMethod: state.pickupMethod
    };
}

// 1. PROSES CHECKOUT VIA WHATSAPP (Direct to Admin 0895 4281 68621)
function checkoutViaWhatsApp() {
    const formData = collectCheckoutForm();
    if (!formData) return;

    const totalPrice = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Format list items
    const itemsText = state.cart.map((item, idx) => {
        let line = `${idx + 1}. *${item.product.name}* (x${item.quantity}) - ${formatRupiah(item.product.price * item.quantity)}`;
        if (item.notes) {
            line += `\n   ↳ _Catatan: ${item.notes}_`;
        }
        return line;
    }).join('\n');

    // Metode Pengambilan Detail
    let pickupText = "";
    if (formData.pickupMethod === 'takeaway') {
        pickupText = `🛍️ *METODE:* AMBIL DI TEMPAT (TAKEAWAY)\n📍 *Lokasi Toko Uji Coba:* Jl. Mahasiswa Kreatif No. 26\n⏰ *Estimasi Waktu Ambil:* ${formData.pickupTime}`;
    } else {
        pickupText = `🛵 *METODE:* PENGIRIMAN / DELIVERY\n📍 *Alamat Lengkap:* ${formData.address}`;
    }

    // Susun Pesan WhatsApp yang Rapi dan Profesional
    const message = `Halo Admin *Jajanan Gen-Z Lumer*! 👋\n` +
        `Saya ingin mengonfirmasi pesanan dari website:\n\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `📋 *DATA PEMESAN*\n` +
        `• Nama Lengkap: *${formData.name}*\n` +
        `• No. WhatsApp: *${formData.phone}*\n` +
        `${pickupText}\n` +
        (formData.notes ? `• Catatan Khusus: _${formData.notes}_\n` : '') +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🍩 *RINCIAN MENU PESANAN*\n` +
        `${itemsText}\n\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `💰 *TOTAL TAGIHAN: ${formatRupiah(totalPrice)}* (${totalQty} item)\n` +
        `━━━━━━━━━━━━━━━━━━\n\n` +
        `Mohon info ketersediaan stok & nomor rekening untuk transfer ya Kak. Terima kasih! 🙏✨`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // Beri konfirmasi ke user dan buka WhatsApp di tab baru
    showToast("Mengalihkan ke WhatsApp Admin...", "success");
    setTimeout(() => {
        window.open(waUrl, '_blank');
        closeCheckoutModal();
    }, 600);
}

// 2. PROSES CHECKOUT VIA FORMULIR GOOGLE FORM & BUKTI TRANSFER
function checkoutViaGoogleForm() {
    const formData = collectCheckoutForm();
    if (!formData) return;

    // Buka modal petunjuk transfer & copy rekening sebelum menuju Google Form
    openBankTransferModal(formData);
}

// Modal Informasi Rekening Transfer Bank & QRIS
function openBankTransferModal(formData) {
    const modal = document.getElementById('bank-transfer-modal');
    const content = document.getElementById('bank-accounts-list');
    const transferTotalEl = document.getElementById('transfer-total-display');
    if (!modal || !content) return;

    const totalPrice = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    if (transferTotalEl) {
        transferTotalEl.textContent = formatRupiah(totalPrice);
    }

    content.innerHTML = STORE_CONFIG.bankAccounts.map(acc => `
        <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    ${acc.bank}
                </div>
                <div class="min-w-0">
                    <div class="text-xs text-stone-500 font-medium">Bank / E-Wallet: ${acc.bank}</div>
                    <div class="text-sm font-black text-stone-800 tracking-wide select-all">${acc.number}</div>
                    <div class="text-[11px] text-stone-500">a.n. ${acc.holder}</div>
                </div>
            </div>
            <button 
                onclick="copyToClipboard('${acc.number}', '${acc.bank}')"
                class="px-3 py-1.5 bg-white border border-stone-300 hover:border-amber-500 hover:text-amber-600 rounded-lg text-xs font-semibold text-stone-600 transition flex items-center gap-1 flex-shrink-0 shadow-2xs"
            >
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                <span>Salin</span>
            </button>
        </div>
    `).join('');

    // Update link Google Form
    const googleFormBtn = document.getElementById('open-google-form-btn');
    if (googleFormBtn) {
        googleFormBtn.href = STORE_CONFIG.googleFormUrl;
        googleFormBtn.target = "_blank";
    }

    modal.classList.remove('hidden');
    lucide.createIcons();
}

function closeBankTransferModal() {
    const modal = document.getElementById('bank-transfer-modal');
    if (modal) modal.classList.add('hidden');
}

// Salin nomor rekening ke clipboard
function copyToClipboard(text, label) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`✓ Nomor ${label} (${text}) berhasil disalin!`, 'success');
        }).catch(() => {
            showToast(`Nomor: ${text}`, 'info');
        });
    } else {
        const tempInput = document.createElement("input");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast(`✓ Nomor ${label} berhasil disalin!`, 'success');
    }
}

// Toast Notifikasi Modern
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const colors = {
        success: 'bg-emerald-600 text-white shadow-emerald-600/30',
        warning: 'bg-amber-600 text-white shadow-amber-600/30',
        error: 'bg-red-600 text-white shadow-red-600/30',
        info: 'bg-stone-800 text-white shadow-stone-800/30'
    };

    const icons = {
        success: 'check-circle',
        warning: 'alert-triangle',
        error: 'alert-circle',
        info: 'info'
    };

    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform translate-y-4 opacity-0 ${colors[type] || colors.info}`;
    toast.innerHTML = `
        <i data-lucide="${icons[type] || 'info'}" class="w-4 h-4 flex-shrink-0"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Animasi Muncul
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    });

    // Otomatis Hilang
    setTimeout(() => {
        toast.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Live Ticker Notifikasi Pesanan Baru (Social Proof Otentik)
function initLiveTicker() {
    const tickerTextEl = document.getElementById('live-ticker-text');
    if (!tickerTextEl) return;

    const buyers = [
        { name: "Sabri (Pelanggan Setia)", item: "Paket Duo Donkus Lumer", time: "2 menit lalu" },
        { name: "Sri dari Kampus A", item: "Donkus Choco Lava Supreme", time: "4 menit lalu" },
        { name: "Africo & Teman", item: "Hampers Box Party (Isi 6)", time: "6 menit lalu" },
        { name: "Dinda W.", item: "Donkus Tiramisu Regal Melt", time: "8 menit lalu" },
        { name: "Efri dari Sentra Kuliner", item: "Brownies Lava Kukus Lumer", time: "11 menit lalu" },
        { name: "Sukyman", item: "Donkus Red Velvet Cream Cheese", time: "15 menit lalu" }
    ];

    let currentIndex = 0;

    function cycleTicker() {
        const current = buyers[currentIndex];
        tickerTextEl.style.opacity = '0';
        setTimeout(() => {
            tickerTextEl.innerHTML = `🔥 <strong>${current.name}</strong> baru saja memesan <em>${current.item}</em> (${current.time})`;
            tickerTextEl.style.opacity = '1';
            currentIndex = (currentIndex + 1) % buyers.length;
        }, 300);
    }

    cycleTicker();
    setInterval(cycleTicker, 5000);
}

// Event Listeners Navigasi, Filter, dan Interaksi
function initEventListeners() {
    // Kategori Filter Tombol
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-stone-900', 'text-white', 'shadow-md');
                b.classList.add('bg-white', 'text-stone-700', 'border');
            });

            btn.classList.add('bg-stone-900', 'text-white', 'shadow-md');
            btn.classList.remove('bg-white', 'text-stone-700', 'border');

            state.selectedCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Input Pencarian
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Tutup Modal ketika klik di luar backdrop
    window.addEventListener('click', (e) => {
        const detailModal = document.getElementById('product-detail-modal');
        const checkoutModal = document.getElementById('checkout-modal');
        const transferModal = document.getElementById('bank-transfer-modal');

        if (e.target === detailModal) closeProductDetail();
        if (e.target === checkoutModal) closeCheckoutModal();
        if (e.target === transferModal) closeBankTransferModal();
    });

    // Escape Key Listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductDetail();
            closeCheckoutModal();
            closeBankTransferModal();
            toggleCart(false);
            toggleMobileMenu(true);
        }
    });
}

// Toggle Menu Navigasi Mobile
function toggleMobileMenu(forceClose) {
    const menu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('mobile-menu-icon-open');
    const iconClose = document.getElementById('mobile-menu-icon-close');
    if (!menu) return;

    const isHidden = menu.classList.contains('hidden');
    const shouldOpen = forceClose ? false : isHidden;

    if (shouldOpen) {
        menu.classList.remove('hidden');
        if (iconOpen) iconOpen.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
    }
}

