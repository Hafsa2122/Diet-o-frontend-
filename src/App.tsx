import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Search, Plus, Minus, Heart, Star, Clock,
  ChevronRight, X, ArrowLeft, Home as HomeIcon, ChefHat,
  Users, Info, HelpCircle, Leaf, Droplets,
  Calendar, ScanLine, TrendingUp, Check, Menu,
  Phone, Mail, Award, Sparkles, MessageCircle, Share2,
  Bookmark
} from "lucide-react";

// ============ DATA ============
const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Drinks", "Healthy"];

const PRODUCTS = [
  { id: 1, name: "Avocado Toast with Egg", weight: "250 g", price: 8.99, mrp: 11.99, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop", category: "Breakfast", rating: 4.8, time: "15 min", tag: "Trending" },
  { id: 2, name: "Berry Smoothie Bowl", weight: "300 g", price: 7.49, mrp: 9.99, image: "/images/berry-smoothie-bowl.jpg", category: "Breakfast", rating: 4.7, time: "10 min", tag: "" },
  { id: 3, name: "Grilled Salmon Bowl", weight: "350 g", price: 14.99, mrp: 18.99, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop", category: "Lunch", rating: 4.9, time: "25 min", tag: "Chef's Pick" },
  { id: 4, name: "Quinoa Power Salad", weight: "400 g", price: 9.99, mrp: 12.99, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop", category: "Healthy", rating: 4.6, time: "12 min", tag: "" },
  { id: 5, name: "Margherita Pizza", weight: "500 g", price: 11.99, mrp: 14.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop", category: "Dinner", rating: 4.8, time: "30 min", tag: "Popular" },
  { id: 6, name: "Chicken Biryani", weight: "450 g", price: 12.99, mrp: 15.99, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop", category: "Dinner", rating: 4.7, time: "35 min", tag: "" },
  { id: 7, name: "Greek Yogurt Parfait", weight: "200 g", price: 5.99, mrp: 7.99, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", category: "Snacks", rating: 4.5, time: "5 min", tag: "" },
  { id: 8, name: "Hummus & Pita", weight: "300 g", price: 6.49, mrp: 8.49, image: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=400&h=400&fit=crop", category: "Snacks", rating: 4.6, time: "8 min", tag: "" },
  { id: 9, name: "Chocolate Lava Cake", weight: "180 g", price: 8.49, mrp: 10.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", category: "Desserts", rating: 4.9, time: "20 min", tag: "Bestseller" },
  { id: 10, name: "Tiramisu", weight: "200 g", price: 9.99, mrp: 12.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop", category: "Desserts", rating: 4.8, time: "15 min", tag: "" },
  { id: 11, name: "Iced Matcha Latte", weight: "350 ml", price: 5.49, mrp: 6.99, image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&h=400&fit=crop", category: "Drinks", rating: 4.7, time: "5 min", tag: "" },
  { id: 12, name: "Fresh Orange Juice", weight: "400 ml", price: 4.99, mrp: 6.49, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop", category: "Drinks", rating: 4.5, time: "3 min", tag: "" },
  { id: 13, name: "Kale Caesar Salad", weight: "350 g", price: 10.99, mrp: 13.99, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=400&fit=crop", category: "Healthy", rating: 4.6, time: "10 min", tag: "" },
  { id: 14, name: "Acai Super Bowl", weight: "400 g", price: 8.99, mrp: 11.49, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop", category: "Healthy", rating: 4.8, time: "8 min", tag: "Trending" },
  { id: 15, name: "Buddha Bowl", weight: "450 g", price: 11.49, mrp: 14.49, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop", category: "Healthy", rating: 4.7, time: "15 min", tag: "" },
  { id: 16, name: "Veggie Burger", weight: "320 g", price: 10.99, mrp: 13.99, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop", category: "Dinner", rating: 4.5, time: "20 min", tag: "" },
  { id: 17, name: "Sushi Platter", weight: "300 g", price: 16.99, mrp: 21.99, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop", category: "Dinner", rating: 4.9, time: "30 min", tag: "Premium" },
  { id: 18, name: "Falafel Wrap", weight: "280 g", price: 8.49, mrp: 10.49, image: "/images/falafel-wrap.jpg", category: "Lunch", rating: 4.6, time: "12 min", tag: "" },
  { id: 19, name: "Protein Pancakes", weight: "300 g", price: 9.49, mrp: 11.99, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop", category: "Breakfast", rating: 4.7, time: "18 min", tag: "" },
  { id: 20, name: "Chia Pudding", weight: "250 g", price: 6.99, mrp: 8.99, image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=400&h=400&fit=crop", category: "Healthy", rating: 4.5, time: "5 min", tag: "" },
];

const FAQS = [
  { q: "How does Diet-o meal planning work?", a: "Diet-o uses AI to analyze your dietary preferences, health goals, and schedule to create personalized weekly meal plans. You can customize any meal, swap ingredients, and we'll generate a smart shopping list automatically." },
  { q: "Can I track my nutrition and calories?", a: "Yes! Every recipe in Diet-o comes with complete nutritional breakdown including calories, macros, vitamins, and minerals. You can sync with Apple Health and Google Fit for seamless tracking." },
  { q: "Are the recipes suitable for dietary restrictions?", a: "Absolutely. We support vegan, vegetarian, keto, paleo, gluten-free, dairy-free, and many more dietary preferences. You can set your restrictions in your profile and we'll filter everything accordingly." },
  { q: "How do I join the community?", a: "Simply create a free account and you'll automatically be part of our 75,000+ member community. Share recipes, join cooking challenges, and get tips from professional chefs and home cooks alike." },
  { q: "Is there a premium subscription?", a: "Diet-o is free to use with access to thousands of recipes and basic meal planning. Diet-o Pro ($9.99/month) unlocks advanced AI planning, unlimited custom meal plans, priority support, and exclusive chef masterclasses." },
  { q: "Can I shop ingredients directly through the app?", a: "Yes! Our Shop feature connects you with local grocery partners. Add recipes to your meal plan and we'll create a shopping list that you can order for delivery in under 30 minutes in select cities." },
];

// ============ TYPES ============
interface CartItem { id: number; qty: number; }

// ============ ANIMATION VARIANTS ============
const pageVariants: any = {
  initial: { opacity: 0, x: "100%", scale: 0.88, rotateY: -8, skewX: 3 },
  animate: {
    opacity: 1, x: 0, scale: 1, rotateY: 0, skewX: 0,
    transition: { type: "spring", stiffness: 180, damping: 22, mass: 1.1 }
  },
  exit: {
    opacity: 0, x: "-60%", scale: 0.92, rotateY: 6, skewX: -2,
    transition: { type: "spring", stiffness: 250, damping: 28 }
  }
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

function SwipeablePage({ children, onSwipeLeft, onSwipeRight, canSwipeLeft = true, canSwipeRight = true }: any) {
  const [dragX, setDragX] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 120;
    if (info.offset.x < -threshold && canSwipeLeft) {
      onSwipeLeft?.();
    } else if (info.offset.x > threshold && canSwipeRight) {
      onSwipeRight?.();
    } else if (Math.abs(info.offset.x) > threshold) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    setDragX(0);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDrag={(_, info) => setDragX(info.offset.x)}
      onDragEnd={handleDragEnd}
      animate={isShaking ? { x: [0, -12, 12, -10, 10, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={isShaking ? { duration: 0.5 } : { type: "spring", stiffness: 400, damping: 30 }}
      style={{ touchAction: "pan-y", cursor: "grab" }}
      className="min-h-screen relative"
    >
      {/* Swipe hint arrows */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 z-30 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{ opacity: dragX > 40 ? Math.min((dragX - 40) / 80, 0.7) : 0 }}>
        <div className="h-10 w-10 rounded-full bg-[#c47a5b]/20 backdrop-blur flex items-center justify-center">
          <ChevronRight size={20} className="text-[#c47a5b] rotate-180" />
        </div>
      </div>
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-30 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{ opacity: dragX < -40 ? Math.min((Math.abs(dragX) - 40) / 80, 0.7) : 0 }}>
        <div className="h-10 w-10 rounded-full bg-[#c47a5b]/20 backdrop-blur flex items-center justify-center">
          <ChevronRight size={20} className="text-[#c47a5b]" />
        </div>
      </div>
      {/* Edge glow effect */}
      <div className="fixed top-0 bottom-0 left-0 w-1 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: dragX > 20 ? Math.min((dragX - 20) / 100, 1) : 0, background: "linear-gradient(to right, rgba(196,122,91,0.3), transparent)" }} />
      <div className="fixed top-0 bottom-0 right-0 w-1 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: dragX < -20 ? Math.min((Math.abs(dragX) - 20) / 100, 1) : 0, background: "linear-gradient(to left, rgba(196,122,91,0.3), transparent)" }} />
      {children}
    </motion.div>
  );
}

// ============ SHARED COMPONENTS ============

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#1e2b26] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2"
    >
      <Check size={16} className="text-[#c47a5b]" />
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
}

function AnimatedLogo({ size = 36 }: { size?: number }) {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className="text-[#c47a5b]">
        {/* Bowl base */}
        <motion.path
          d="M8 22c0 8 7 14 16 14s16-6 16-14H8z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {/* Bowl rim */}
        <motion.ellipse
          cx="24"
          cy="22"
          rx="16"
          ry="4"
          stroke="currentColor"
          strokeWidth="2.2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        />
        {/* Leaf inside bowl */}
        <motion.path
          d="M24 18c-3 0-5 2-5 5 0 4 3 7 5 9 2-2 5-5 5-9 0-3-2-5-5-5z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, scale: 0.5 }}
          animate={{ pathLength: 1, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "24px 24px" }}
        />
        <motion.path
          d="M24 18v9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        />
        {/* Steam line 1 */}
        <motion.path
          d="M18 14c0-3 2-5 2-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.6, 0.3, 0.6, 0.3] }}
          transition={{
            pathLength: { duration: 0.5, delay: 1.1 },
            opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
          }}
        />
        {/* Steam line 2 */}
        <motion.path
          d="M24 12c0-3 1.5-4 1.5-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0.2, 0.5, 0.2] }}
          transition={{
            pathLength: { duration: 0.5, delay: 1.3 },
            opacity: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        />
        {/* Steam line 3 */}
        <motion.path
          d="M30 14c0-3 2-5 2-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.55, 0.25, 0.55, 0.25] }}
          transition={{
            pathLength: { duration: 0.5, delay: 1.5 },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.7 }
          }}
        />
        {/* Small sparkle dots */}
        <motion.circle
          cx="14" cy="10" r="1.2"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
        />
        <motion.circle
          cx="34" cy="8" r="1"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 2.2 }}
        />
      </svg>
    </motion.div>
  );
}

function DraggableZigZag() {
  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.15}
      whileHover={{ scale: 1.08 }}
      whileDrag={{ scale: 1.2, rotate: 8 }}
      initial={{ x: typeof window !== 'undefined' ? window.innerWidth - 160 : 100, y: 200 }}
      animate={{ rotate: [0, 4, -4, 0], y: [0, -8, 8, 0] }}
      transition={{ rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      className="fixed z-50 cursor-grab active:cursor-grabbing hidden md:block"
      style={{ touchAction: "none" }}
    >
      <svg width="100" height="80" viewBox="0 0 100 80">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <motion.path
          d="M5,40 L18,12 L32,68 L46,12 L60,68 L74,12 L88,68 L95,40"
          fill="none"
          stroke="#c47a5b"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M5,55 L18,25 L32,75 L46,25 L60,75 L74,25 L88,75 L95,55"
          fill="none"
          stroke="#c47a5b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[#c47a5b] font-semibold whitespace-nowrap bg-white/80 backdrop-blur px-2.5 py-0.5 rounded-full shadow-sm"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Drag me!
      </motion.div>
    </motion.div>
  );
}

function ZigZagBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.025]">
      <svg className="w-full h-full">
        <pattern id="zigzag-bg" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <path d="M0,20 L20,0 L40,20 L60,0 L80,20" fill="none" stroke="#1e2b26" strokeWidth="1.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#zigzag-bg)" />
      </svg>
    </div>
  );
}

function ProductCard({ product, cartQty, onAdd, onUpdateQty, isFavorite, onToggleFavorite }: any) {
  return (
    <motion.div variants={itemVariants} className="group relative">
      <div className="rounded-2xl bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-black/[0.04] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f5f0eb]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
          {product.time && (
            <span className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock size={10} /> {product.time}
            </span>
          )}
          {product.tag && (
            <span className="absolute top-2 right-2 bg-[#c47a5b] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {product.tag}
            </span>
          )}
          <button
            type="button"
            onClick={() => onToggleFavorite?.(product.id)}
            className={`absolute bottom-2 right-2 h-7 w-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center transition shadow-sm ${isFavorite ? "text-red-500" : "text-[#1e2b26]/30 hover:text-red-500"}`}
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
          >
            <Heart size={14} className={isFavorite ? "fill-red-500" : ""} />
          </button>
        </div>
        <h3 className="mt-2.5 text-[13px] font-semibold leading-tight line-clamp-2 text-[#1e2b26]">{product.name}</h3>
        <p className="text-[11px] text-[#1e2b26]/50 mt-0.5">{product.weight}</p>
        <div className="mt-1.5 flex items-center gap-1">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-medium text-[#1e2b26]/70">{product.rating}</span>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <span className="text-[15px] font-bold text-[#1e2b26]">${product.price}</span>
            <span className="text-[11px] text-[#1e2b26]/40 line-through ml-1">${product.mrp}</span>
          </div>
          {!cartQty ? (
            <motion.button
              whileTap={{ scale: 0.75 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onAdd(product.id)}
              className="h-8 w-8 rounded-full bg-[#c47a5b] text-white flex items-center justify-center shadow-lg shadow-[#c47a5b]/25"
            >
              <Plus size={16} strokeWidth={2.5} />
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-[#c47a5b]/10 rounded-full px-1.5 py-1"
            >
              <button onClick={() => onUpdateQty(product.id, -1)} className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#c47a5b] shadow-sm hover:shadow transition">
                <Minus size={12} strokeWidth={2.5} />
              </button>
              <span className="text-[13px] font-bold w-5 text-center text-[#1e2b26]">{cartQty}</span>
              <button onClick={() => onUpdateQty(product.id, 1)} className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#c47a5b] shadow-sm hover:shadow transition">
                <Plus size={12} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CartDrawer({ open, onClose, cart, onUpdateQty }: any) {
  const cartProducts = cart.map((c: CartItem) => ({ ...c, ...PRODUCTS.find(p => p.id === c.id) })).filter((c: any) => c.name);
  const total = cartProducts.reduce((s: number, c: any) => s + c.price * c.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1e2b26]/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-[#fcfaf7] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
              <h3 className="text-[18px] font-bold flex items-center gap-2">
                <ShoppingCart size={20} /> My Kitchen
              </h3>
              <button onClick={onClose} className="h-9 w-9 rounded-full hover:bg-black/5 flex items-center justify-center transition">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto px-6 py-5 space-y-4">
              {cartProducts.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart size={48} className="mx-auto text-[#1e2b26]/20 mb-4" />
                  <p className="text-[#1e2b26]/50 font-medium">Your kitchen is empty</p>
                  <p className="text-[13px] text-[#1e2b26]/40 mt-1">Add some delicious items!</p>
                </div>
              ) : (
                cartProducts.map((item: any) => (
                  <motion.div layout key={item.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm border border-black/5">
                    <img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[14px] truncate">{item.name}</h4>
                      <p className="text-[13px] text-[#1e2b26]/60 mt-0.5">${item.price.toFixed(2)}</p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="h-7 w-7 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition active:scale-90">
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-[14px] font-semibold">{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="h-7 w-7 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition active:scale-90">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            {cartProducts.length > 0 && (
              <div className="border-t border-black/5 bg-white px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[15px] text-[#1e2b26]/70">Subtotal</span>
                  <span className="text-[22px] font-bold">${total.toFixed(2)}</span>
                </div>
                <button onClick={() => { onClose(); alert("Order placed! Arriving in 30 min"); }} className="w-full rounded-full bg-[#c47a5b] py-3.5 font-semibold text-white shadow-lg shadow-[#c47a5b]/20 hover:bg-[#b46e52] transition active:scale-[0.98]">
                  Checkout • ${total.toFixed(2)}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function BottomNav({ page, onNavigate, cartCount }: any) {
  const tabs = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "recipes", label: "Recipes", icon: ChefHat },

    { id: "community", label: "Community", icon: Users },
    { id: "more", label: "More", icon: Menu },
  ];

  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/5 md:hidden">
        <div className="flex items-center justify-around py-2 pb-safe">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "more") { setMoreOpen(true); return; }
                onNavigate(tab.id);
              }}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition ${page === tab.id ? "text-[#c47a5b]" : "text-[#1e2b26]/50"}`}
            >
              <tab.icon size={20} strokeWidth={page === tab.id ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {tab.id === "shop" && cartCount > 0 && (
                <span className="absolute top-0 right-1 h-4 w-4 rounded-full bg-[#c47a5b] text-white text-[9px] font-bold flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {moreOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/30" onClick={() => setMoreOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-6 pb-10"
            >
              <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-bold mb-4">More</h3>
              <div className="space-y-2">
                {[
                  { id: "about", label: "About Us", icon: Info },
                  { id: "faq", label: "FAQ", icon: HelpCircle },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMoreOpen(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 transition text-left"
                  >
                    <item.icon size={20} className="text-[#c47a5b]" />
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight size={16} className="ml-auto text-[#1e2b26]/30" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============ PAGES ============

function HomePage({ onNavigate, onCartOpen, cartCount }: any) {
  const [activeNav, setActiveNav] = useState("Home");
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Prep Avocado Toast", time: "Today • Breakfast", completed: false },
    { id: 2, title: "Cook Salmon Bowl", time: "Today • Lunch", completed: false },
    { id: 3, title: "Bake Sourdough Bread", time: "Tomorrow", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const navItems = ["Home", "Recipes", "Community", "About Us", "FAQ"];
  const navMap: any = { "Home": "home", "Recipes": "recipes", "Community": "community", "About Us": "about", "FAQ": "faq" };

  const avatars = [
    "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100",
    "https://images.pexels.com/photos/30795870/pexels-photo-30795870.jpeg?auto=compress&cs=tinysrgb&w=100",
    "https://images.pexels.com/photos/26621714/pexels-photo-26621714.jpeg?auto=compress&cs=tinysrgb&w=100",
  ];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="h-screen overflow-auto bg-gradient-to-b from-[#EAF7FA] to-[#DDF5FF]">
        <div className="relative w-full min-h-screen overflow-hidden bg-[#e6f0ef]">
          <div className="absolute inset-0">
            <motion.img
              src="/images/food-hero.jpg"
              alt=""
              className="h-full w-full object-cover object-center blur-sm"
              initial={{ scale: 1.15 }}
              animate={{ x: [-20, 20, -20] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#e6f0ef]/40 via-[#e6f0ef]/20 to-[#e6f0ef]/60" />
          </div>

          <div className="relative z-10 h-full">
            <header className="flex items-center justify-between px-6 md:px-10 lg:px-14 pt-7 pb-6">
              <div className="flex items-center gap-3">
                <AnimatedLogo size={40} />
                <div>
                  <h1 className="font-fraunces text-[22px] font-bold tracking-[0.02em] leading-none text-[#1e2b26]">Diet-o</h1>
                  <p className="text-[10px] tracking-[0.18em] text-[#1e2b26]/60 font-medium mt-[2px]">EAT. PLAN. THRIVE.</p>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => { setActiveNav(item); onNavigate(navMap[item]); }}
                    className={`relative text-[14px] font-medium transition-colors py-2 ${activeNav === item ? "text-[#1e2b26]" : "text-[#1e2b26]/70 hover:text-[#1e2b26]"}`}
                  >
                    {item}
                    {activeNav === item && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#c47a5b] rounded-full" />}
                  </button>
                ))}
              </nav>

              <motion.button
                onClick={onCartOpen}
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 rounded-full bg-[#c47a5b] px-5 py-[11px] text-white shadow-[0_4px_16px_rgba(196,122,91,0.3)] transition-colors hover:bg-[#b46e52]"
              >
                <ShoppingCart size={18} />
                <span className="text-[14px] font-medium tracking-wide hidden sm:inline">My Kitchen ({cartCount})</span>
                <span className="text-[14px] font-medium sm:hidden">({cartCount})</span>
              </motion.button>
            </header>

            <div className="px-6 md:px-10 lg:px-14 pb-24">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-16 items-start mt-8 lg:mt-14">
                <div className="relative z-10">
                  <motion.h2 animate={{ x: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="font-fraunces text-[48px] md:text-[64px] lg:text-[80px] xl:text-[90px] font-semibold leading-[0.9] tracking-[-0.02em] text-[#1e2b26]">
                    Bring Flavor Into<br />Your Everyday<br />Meals
                  </motion.h2>
                  <motion.p animate={{ x: [8, -8, 8] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="mt-6 max-w-[420px] text-[16px] leading-[1.7] text-[#1e2b26]/75 font-medium">
                    Discover intelligent recipes, connect with food lovers, and create a tastier, happier life with Diet-o.
                  </motion.p>
                  <motion.div animate={{ x: [-6, 6, -6] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="mt-10 flex items-center gap-4">
                    <button onClick={() => onNavigate("recipes")} className="group rounded-full bg-[#c47a5b] px-8 py-[15px] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(196,122,91,0.25)] transition-all hover:shadow-[0_12px_32px_rgba(196,122,91,0.35)] hover:-translate-y-[1px] active:translate-y-0">
                      Explore Recipes
                    </button>
                    <button onClick={() => onNavigate("recipes")} className="h-[48px] w-[48px] grid place-items-center rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition hover:bg-white hover:scale-105 active:scale-95">
                      <ChevronRight size={18} className="text-[#1e2b26]" />
                    </button>
                  </motion.div>
                  <motion.div animate={{ x: [7, -7, 7] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="mt-14 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {avatars.map((src, i) => (
                        <img key={i} src={src} alt="" className="h-10 w-10 rounded-full border-[3px] border-[#e6f0ef] object-cover shadow-sm" />
                      ))}
                      <button onClick={() => setShowCommunity(true)} className="h-10 w-10 grid place-items-center rounded-full border-[3px] border-[#e6f0ef] bg-white/80 backdrop-blur text-[#1e2b26]/70 shadow-sm hover:bg-white transition">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#1e2b26]">Join 75K+</p>
                      <p className="text-[13px] text-[#1e2b26]/60">food lovers</p>
                    </div>
                  </motion.div>
                </div>

                {/* Today's Menu Card */}
                <div className="relative lg:pt-4">
                  <motion.div className="ml-auto w-full max-w-[380px] -mt-8 rounded-[28px] bg-[#f9f5f0]/90 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}>
                    <div className="p-[16px]">
                      <div className="flex items-center gap-2.5 mb-5">
                        <Calendar size={20} className="text-[#1e2b26]" />
                        <h3 className="text-[16px] font-semibold text-[#1e2b26]">Today's Menu</h3>
                      </div>
                      <div className="space-y-1">
                        {tasks.map((task) => (
                          <button key={task.id} onClick={() => toggleTask(task.id)} className="w-full flex items-center gap-3.5 py-3.5 border-b border-[#1e2b26]/[0.08] last:border-0 text-left transition">
                            <div className={`h-9 w-9 rounded-full border grid place-items-center transition-all ${task.completed ? "bg-[#c47a5b] border-[#c47a5b] text-white" : "bg-white/70 border-[#1e2b26]/10 text-[#1e2b26]/70"}`}>
                              {task.completed ? <Check size={14} strokeWidth={3} /> : <Droplets size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[14px] font-medium leading-snug truncate ${task.completed ? "line-through text-[#1e2b26]/40" : "text-[#1e2b26]"}`}>{task.title}</p>
                              <p className="text-[12px] text-[#1e2b26]/55 mt-0.5">{task.time}</p>
                            </div>
                            <div className={`h-2 w-2 rounded-full ${task.completed ? "bg-[#1e2b26]/20" : "bg-amber-400"}`} />
                          </button>
                        ))}
                      </div>
                      <button onClick={() => onNavigate("meal-plan")} className="mt-4 flex w-full items-center justify-between text-[14px] font-medium text-[#1e2b26] hover:text-[#c47a5b] transition group">
                        <span>View Full Meal Plan</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Fresh Food Card */}
                  <motion.div className="ml-auto mt-6 w-full max-w-[380px] rounded-[28px] bg-[#f9f5f0]/90 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 150, damping: 20, delay: 0.2 }}>
                    <div className="p-[20px]">
                      <div className="mb-5 h-10 w-10 rounded-full bg-white/80 border border-[#c47a5b]/20 grid place-items-center">
                        <AnimatedLogo size={28} />
                      </div>
                      <h3 className="font-fraunces text-[26px] leading-[1.25] font-semibold text-[#1e2b26]">Fresh food,<br />happy life.</h3>
                      <p className="mt-3.5 text-[14px] leading-[1.6] text-[#1e2b26]/65">
                        Smart meal plans, chef tips, and a community that cooks with you.
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <img src={avatars[0]} alt="" className="h-7 w-7 rounded-full border-2 border-[#f9f5f0] object-cover" />
                          <img src={avatars[1]} alt="" className="h-7 w-7 rounded-full border-2 border-[#f9f5f0] object-cover" />
                          <div className="h-7 w-7 rounded-full border-2 border-[#f9f5f0] bg-white grid place-items-center text-[11px] font-medium text-[#1e2b26]/70">+</div>
                        </div>
                        <div className="text-[12px] leading-tight">
                          <p className="text-[#1e2b26]/55">Loved by</p>
                          <p className="font-semibold text-[#1e2b26]">home chefs</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Navigation Box */}
              <motion.div className="mt-16 mx-auto w-full max-w-[740px] z-40" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
                <motion.div className="flex items-center justify-between gap-2 rounded-full bg-[#f9f5f0]/85 backdrop-blur-2xl px-5 md:px-7 py-3.5 shadow-lg" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.3 } } }} initial="hidden" animate="visible">
                  {[
                    { label: "Smart Meal", sub: "Planning", icon: Calendar, page: "meal-plan" },
                    { label: "Recipe", sub: "Discovery", icon: ScanLine, page: "recipes" },
                    { label: "Community", sub: "Connection", icon: Users, page: "community" },
                    { label: "Nutrition", sub: "Tracking", icon: TrendingUp, page: "nutrition" },
                  ].map((item) => (
                    <motion.button key={item.label} onClick={() => onNavigate(item.page)} className="group flex items-center gap-2.5 md:gap-3 px-2.5 md:px-3 py-1.5 rounded-full transition hover:bg-white/60" whileHover={{ y: -4, scale: 1.04 }} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                      <div className="h-8 w-8 grid place-items-center text-[#1e2b26]/80 group-hover:text-[#c47a5b] transition">
                        <item.icon size={20} strokeWidth={1.75} />
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-[13px] font-semibold text-[#1e2b26]">{item.label}</p>
                        <p className="text-[12px] text-[#1e2b26]/60">{item.sub}</p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Modal */}
      <AnimatePresence>
        {showMenuModal && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1e2b26]/60 backdrop-blur-md" onClick={() => setShowMenuModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-[520px] rounded-[28px] bg-[#fcfaf7] shadow-2xl p-7">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-fraunces text-[28px] font-semibold">Your Meal Plan</h3>
                  <p className="text-[14px] text-[#1e2b26]/60 mt-1">This week • 21 recipes planned</p>
                </div>
                <button onClick={() => setShowMenuModal(false)} className="h-9 w-9 rounded-full hover:bg-black/5 grid place-items-center -mt-1 -mr-1"><X size={20} /></button>
              </div>
              <div className="mt-6 space-y-3 max-h-[380px] overflow-auto">
                {[{ day: "Today", meals: ["Avocado Toast + Poached Egg", "Miso Salmon Bowl", "Lentil Curry"] }, { day: "Tomorrow", meals: ["Overnight Oats", "Quinoa Power Salad", "Sourdough + Soup"] }, { day: "Wednesday", meals: ["Green Smoothie", "Chicken Wrap", "Stir-fry Veggies"] }].map(section => (
                  <div key={section.day} className="rounded-2xl bg-white p-4 border border-black/5">
                    <h4 className="text-[13px] font-bold uppercase tracking-wide text-[#c47a5b] mb-2.5">{section.day}</h4>
                    <div className="space-y-2">
                      {section.meals.map((meal, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-[14px]">{meal}</span>
                          <button onClick={() => alert(`Cooking: ${meal}`)} className="text-[12px] font-medium text-[#c47a5b] hover:underline">Cook</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowMenuModal(false)} className="mt-6 w-full rounded-full bg-[#1e2b26] py-3 font-semibold text-white hover:bg-black transition">Customize Plan</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Community Modal */}
      <AnimatePresence>
        {showCommunity && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1e2b26]/60 backdrop-blur-md" onClick={() => setShowCommunity(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-[420px] rounded-[28px] bg-white shadow-2xl p-8 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-[#c47a5b]/10 text-[#c47a5b] grid place-items-center mb-4"><Users size={28} strokeWidth={1.75} /></div>
              <h3 className="font-fraunces text-[26px] font-semibold">Join 75,000+ food lovers</h3>
              <p className="mt-2 text-[15px] text-[#1e2b26]/70">Share recipes, get chef tips, and cook together. Free forever.</p>
              <div className="mt-6 flex gap-2">
                <input placeholder="your@email.com" className="flex-1 rounded-full border border-black/10 px-4 py-3 text-[14px] outline-none focus:border-[#c47a5b] focus:ring-2 focus:ring-[#c47a5b]/20" />
                <button onClick={() => { setShowCommunity(false); alert("Welcome to Diet-o!"); }} className="rounded-full bg-[#c47a5b] px-6 font-semibold text-white hover:bg-[#b46e52] transition">Join</button>
              </div>
              <button onClick={() => setShowCommunity(false)} className="mt-4 text-[13px] text-[#1e2b26]/60 hover:underline">Maybe later</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div >
  );
}

function RecipesPage({ onNavigate, onCartOpen, cart, onAddToCart, onUpdateQty, cartCount }: any) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const toggleFavorite = (id: number) => {
    setFavoriteIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#f7f5f2] pb-28 md:pb-8 relative">
      <ZigZagBackground />
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => onNavigate("home")} className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-fraunces">Recipes</h1>
          <button onClick={onCartOpen} className="ml-auto relative h-10 w-10 rounded-full bg-[#c47a5b] text-white flex items-center justify-center shadow-md active:scale-90 transition">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#1e2b26] text-white text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>
      </div>

      <motion.div animate={{ x: [-8, 8, -8] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <div className="max-w-6xl mx-auto px-4 mt-6 relative z-10">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1e2b26]/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="w-full rounded-2xl bg-white border border-black/5 pl-11 pr-4 py-3.5 text-[15px] outline-none focus:border-[#c47a5b] focus:ring-2 focus:ring-[#c47a5b]/15 transition shadow-sm"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-4 relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium transition ${activeCategory === cat ? "bg-[#c47a5b] text-white shadow-md shadow-[#c47a5b]/20" : "bg-white text-[#1e2b26]/70 border border-black/5 hover:border-[#c47a5b]/30"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-6 relative z-10">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                cartQty={cart.find((c: CartItem) => c.id === product.id)?.qty || 0}
                onAdd={onAddToCart}
                onUpdateQty={onUpdateQty}
                isFavorite={favoriteIds.includes(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto text-[#1e2b26]/20 mb-4" />
              <p className="text-[#1e2b26]/50 font-medium">No recipes found</p>
              <p className="text-[13px] text-[#1e2b26]/40 mt-1">Try a different search or category</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}


function CommunityPage({ onNavigate }: any) {
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [shared, setShared] = useState<number[]>([]);
  const [showCommentFor, setShowCommentFor] = useState<number | null>(null);
  const [postComments, setPostComments] = useState<Record<number, { user: string, text: string }[]>>({});
  const [commentText, setCommentText] = useState("");
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleShare = (id: number) => {
    setShared(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const [stories, setStories] = useState([
    { id: 1, name: "Your Story", img: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100", isYou: true, hasStory: false },
    { id: 2, name: "Chef Maria", img: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 3, name: "David Cooks", img: "https://images.pexels.com/photos/30795870/pexels-photo-30795870.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 4, name: "Sarah Bakes", img: "https://images.pexels.com/photos/26621714/pexels-photo-26621714.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 5, name: "Alex Eats", img: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 6, name: "Lisa Cooks", img: "https://images.pexels.com/photos/30795870/pexels-photo-30795870.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: false },
    { id: 7, name: "Mike Foodie", img: "https://images.pexels.com/photos/26621714/pexels-photo-26621714.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 8, name: "Emma Chef", img: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: false },
    { id: 9, name: "Tom Baker", img: "https://images.pexels.com/photos/30795870/pexels-photo-30795870.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 10, name: "Nina", img: "https://images.pexels.com/photos/26621714/pexels-photo-26621714.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 11, name: "John Doe", img: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
    { id: 12, name: "Jane Cook", img: "https://images.pexels.com/photos/26621714/pexels-photo-26621714.jpeg?auto=compress&cs=tinysrgb&w=100", hasStory: true },
  ]);

  const challenges = [
    { id: 1, title: "7-Day Healthy", participants: "12.4K", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop", color: "from-emerald-400 to-teal-500" },
    { id: 2, title: "Protein Power", participants: "8.2K", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop", color: "from-amber-400 to-orange-500" },
    { id: 3, title: "Vegan Week", participants: "5.8K", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", color: "from-rose-400 to-pink-500" },
    { id: 4, title: "Sugar-Free", participants: "4.1K", img: "https://images.unsplash.com/photo-1490474504059-bf6f7d65f121?w=300&h=200&fit=crop", color: "from-purple-400 to-fuchsia-500" },
    { id: 5, title: "Keto Start", participants: "9.3K", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop", color: "from-blue-400 to-cyan-500" },
  ];

  const feedPosts = [
    { id: 1, user: "Chef Maria", avatar: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&h=500&fit=crop", caption: "My secret avocado toast recipe! Perfectly ripe avocados + lime juice = magic ✨", likes: 342, comments: 56, time: "2h ago", tag: "Trending" },
    { id: 2, user: "David Cooks", avatar: "https://images.pexels.com/photos/30795870/pexels-photo-30795870.jpeg?auto=compress&cs=tinysrgb&w=100", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=500&fit=crop", caption: "Grilled salmon with lemon butter sauce. Restaurant quality at home! Who wants the recipe?", likes: 518, comments: 89, time: "5h ago", tag: "Chef's Pick" },
    { id: 3, user: "Sarah Bakes", avatar: "https://images.pexels.com/photos/26621714/pexels-photo-26621714.jpeg?auto=compress&cs=tinysrgb&w=100", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=500&fit=crop", caption: "Chocolate lava cake that flows like a river! 🍫 Save this for your next dinner party.", likes: 891, comments: 124, time: "8h ago", tag: "Bestseller" },
    { id: 4, user: "Alex Eats", avatar: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=500&fit=crop", caption: "Homemade pizza night! Fresh basil from my garden makes all the difference 🌿", likes: 234, comments: 42, time: "12h ago", tag: "" },
  ];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#f7f5f2] pb-28 md:pb-8">
      {/* Zepto-style vibrant header */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-[#c47a5b] to-[#d48b6c]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onNavigate("home")}
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-white">Community</h1>
            <p className="text-[12px] text-white/80">75,000+ food lovers cooking together</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => alert("Search clicked!")}
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
          >
            <Search size={18} />
          </motion.button>
        </div>
      </div>

      <motion.div animate={{ x: [-6, 6, -6] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="max-w-6xl mx-auto">
          {/* Stories Row - Zepto style */}
          <div className="bg-white pt-5 pb-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {stories.map((story, i) => (
                <motion.button
                  key={story.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setActiveStory(story.id)}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 snap-start"
                >
                  <div className={`relative p-[3px] rounded-full ${story.hasStory ? "bg-gradient-to-tr from-[#c47a5b] via-[#e8a87c] to-[#c47a5b]" : story.isYou ? "bg-[#1e2b26]/20" : "bg-transparent"}`}>
                    <div className="h-[64px] w-[64px] rounded-full border-[3px] border-white overflow-hidden bg-[#f0e6df]">
                      <img src={story.img} alt="" className="h-full w-full object-cover" />
                    </div>
                    {story.isYou && (
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#c47a5b] text-white flex items-center justify-center border-2 border-white shadow-sm">
                        <Plus size={14} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-[#1e2b26]/80 max-w-[68px] truncate">{story.name}</span>
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stories.length * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => {
                  setStories(prev => [
                    ...prev,
                    {
                      id: prev.length + 1,
                      name: `New Chef ${prev.length + 1}`,
                      img: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&w=100",
                      hasStory: true
                    }
                  ]);
                }}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 snap-start"
              >
                <div className="relative p-[3px] rounded-full bg-transparent">
                  <div className="h-[64px] w-[64px] rounded-full border-[2.5px] border-dashed border-[#c47a5b]/40 overflow-hidden bg-black/[0.02] flex items-center justify-center text-[#c47a5b] hover:bg-[#c47a5b]/10 hover:border-[#c47a5b] transition">
                    <Plus size={28} />
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#1e2b26]/80 max-w-[68px] truncate">Add More</span>
              </motion.button>
            </div>
          </div>

          {/* Quick Stats - Zepto pills */}
          <div className="px-4 mt-4">
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { label: "Trending", icon: TrendingUp, count: "2.4K" },
                { label: "New Recipes", icon: Sparkles, count: "156" },
                { label: "Live Now", icon: Users, count: "340" },
                { label: "Challenges", icon: Award, count: "12" },
              ].map((pill, i) => (
                <motion.button
                  key={pill.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => alert(pill.label + " clicked!")}
                  className="flex-shrink-0 flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-sm border border-black/[0.04]"
                >
                  <pill.icon size={15} className="text-[#c47a5b]" />
                  <span className="text-[12px] font-semibold text-[#1e2b26]">{pill.label}</span>
                  <span className="text-[11px] font-bold text-[#c47a5b] bg-[#c47a5b]/10 px-1.5 py-0.5 rounded-full">{pill.count}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Challenges Carousel - Zepto style bold cards */}
          <div className="px-4 mt-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-bold text-[#1e2b26]">Live Challenges</h2>
              <button onClick={() => setShowAllChallenges(!showAllChallenges)} className="text-[13px] font-semibold text-[#c47a5b]">{showAllChallenges ? "Show Less" : "See All"}</button>
            </div>
            <div className={showAllChallenges ? "grid grid-cols-2 md:grid-cols-3 gap-3" : "flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"}>
              {challenges.map((challenge, i) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 250, damping: 20 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => alert("Joined " + challenge.title + "!")}
                  className={showAllChallenges ? "w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer" : "flex-shrink-0 w-[260px] rounded-2xl overflow-hidden shadow-lg snap-start cursor-pointer"}
                >
                  <div className="relative h-[140px]">
                    <img src={challenge.img} alt="" className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${challenge.color} opacity-60`} />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white text-[16px] font-bold">{challenge.title}</h3>
                      <p className="text-white/90 text-[12px] font-medium">{challenge.participants} participating</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1">
                      <span className="text-[10px] font-bold text-[#1e2b26]">JOIN</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feed - Zepto style big cards */}
          <div className="px-4 mt-5">
            <h2 className="text-[16px] font-bold text-[#1e2b26] mb-4">Fresh from the Kitchen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {feedPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200, damping: 22 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/[0.03]"
                >
                  {/* User header */}
                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-full p-[2px] bg-gradient-to-tr from-[#c47a5b] to-[#e8a87c]">
                        <img src={post.avatar} alt="" className="h-full w-full rounded-full object-cover border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#1e2b26]">{post.user}</p>
                        <p className="text-[11px] text-[#1e2b26]/50">{post.time}</p>
                      </div>
                    </div>
                    {post.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#c47a5b] bg-[#c47a5b]/10 px-2.5 py-1 rounded-full">
                        {post.tag}
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <img src={post.image} alt="" className="w-full aspect-[4/3.5] object-cover" />
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => toggleSave(post.id)}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-white hover:bg-black/50 transition"
                    >
                      <Heart size={15} className={saved.includes(post.id) ? "fill-white" : ""} />
                    </motion.button>
                  </div>

                  {/* Actions */}
                  <div className="p-3.5">
                    <div className="flex items-center gap-5">
                      <motion.button
                        whileTap={{ scale: 0.75 }}
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1.5"
                      >
                        <Heart
                          size={22}
                          className={liked.includes(post.id) ? "text-red-500 fill-red-500" : "text-[#1e2b26]/60"}
                        />
                        <span className={`text-[13px] font-bold ${liked.includes(post.id) ? "text-red-500" : "text-[#1e2b26]/70"}`}>
                          {post.likes + (liked.includes(post.id) ? 1 : 0)}
                        </span>
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.75 }} onClick={() => { setShowCommentFor(prev => prev === post.id ? null : post.id); setCommentText(""); }} className="flex items-center gap-1.5">
                        <MessageCircle size={22} className={showCommentFor === post.id ? "text-[#c47a5b] fill-[#c47a5b]/20" : "text-[#1e2b26]/60"} />
                        <span className={`text-[13px] font-bold ${showCommentFor === post.id ? "text-[#c47a5b]" : "text-[#1e2b26]/70"}`}>{post.comments + (postComments[post.id]?.length || 0)}</span>
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.75 }} onClick={() => toggleShare(post.id)} className="flex items-center gap-1.5">
                        <Share2 size={22} className={shared.includes(post.id) ? "text-[#c47a5b]" : "text-[#1e2b26]/60"} />
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.75 }} onClick={() => toggleSave(post.id)} className="ml-auto">
                        <Bookmark size={22} className={saved.includes(post.id) ? "text-[#c47a5b] fill-[#c47a5b]" : "text-[#1e2b26]/60"} />
                      </motion.button>
                    </div>

                    {/* Caption */}
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[#1e2b26]/85">
                      <span className="font-bold text-[#1e2b26]">{post.user}</span>{" "}
                      {post.caption}
                    </p>

                    {/* Display Saved Comments */}
                    {postComments[post.id] && postComments[post.id].length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {postComments[post.id].map((c, idx) => (
                          <p key={idx} className="text-[13px] text-[#1e2b26]/80">
                            <span className="font-bold text-[#1e2b26]">{c.user}</span> {c.text}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Comment Box */}
                    <AnimatePresence>
                      {showCommentFor === post.id && (
                        <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: "auto", opacity: 1, marginTop: 12 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
                          <div className="flex items-center gap-2">
                            <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." className="flex-1 bg-black/5 rounded-full px-4 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#c47a5b]" />
                            <button onClick={() => { if (commentText.trim()) { setPostComments(p => ({ ...p, [post.id]: [...(p[post.id] || []), { user: "You", text: commentText.trim() }] })); setCommentText(""); } }} className="text-[#c47a5b] font-bold text-[13px] px-2">Post</button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="px-4 mt-2 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full bg-gradient-to-r from-[#1e2b26] to-[#2d3f38] rounded-3xl p-10 text-white text-center shadow-2xl"
            >
              <h3 className="text-[28px] font-bold">Share Your Recipe</h3>
              <p className="text-[16px] text-white/70 mt-2 mb-6">Join 75K+ food lovers sharing daily</p>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => alert("Drafting new post...")}
                className="mt-2 bg-white text-[#1e2b26] px-10 py-3.5 rounded-full text-[16px] font-bold shadow-lg hover:bg-white/90 transition"
              >
                Post Now
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Story Viewer Modal */}
        <AnimatePresence>
          {activeStory !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black"
            >
              <div className="relative h-full flex flex-col">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-10">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-white"
                  />
                </div>
                {/* Header */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full border-2 border-white/50 overflow-hidden">
                    <img src={stories.find(s => s.id === activeStory)?.img} alt="" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-white text-[14px] font-semibold">{stories.find(s => s.id === activeStory)?.name}</span>
                  <button onClick={() => setActiveStory(null)} className="ml-auto text-white/80 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                {/* Story content */}
                <div className="flex-1 flex items-center justify-center bg-[#1e2b26]">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center text-white px-8"
                  >
                    <ChefHat size={64} className="mx-auto mb-4 text-[#c47a5b]" />
                    <h3 className="text-[24px] font-bold">{stories.find(s => s.id === activeStory)?.name}'s Story</h3>
                    <p className="text-white/60 mt-2">Just shared a new recipe! Check it out.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function AnimatedStat({ target, suffix, isTime }: { target: number, suffix: string, isTime?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2500;
    let animationFrame: number;
    let interval: any;

    const animate = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        if (!isTime) {
          interval = setInterval(() => {
            setCount(prev => prev + Math.floor(Math.random() * 3));
          }, 1500);
        } else {
          interval = setInterval(() => {
            setCount(target + Math.floor(Math.random() * 4) - 1);
          }, 3500);
        }
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrame);
      if (interval) clearInterval(interval);
    };
  }, [target, isTime]);

  const displayValue = target >= 1000 ? count.toLocaleString() : count;
  return <span>{displayValue}{suffix}</span>;
}

function AboutUsPage({ onNavigate }: any) {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#f7f5f2] pb-28 md:pb-8">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => onNavigate("home")} className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-fraunces">About Us</h1>
        </div>
      </div>

      <motion.div animate={{ x: [7, -7, 7] }} transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
          <div className="text-center">
            <div className="h-16 w-16 rounded-2xl bg-[#c47a5b]/10 text-[#c47a5b] grid place-items-center mx-auto mb-4">
              <AnimatedLogo size={40} />
            </div>
            <h2 className="font-fraunces text-[36px] font-semibold">Our Mission</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#1e2b26]/70 max-w-lg mx-auto">
              We believe everyone deserves access to healthy, delicious food. Diet-o was born from a simple idea: make cooking joyful, meal planning effortless, and healthy eating accessible to all.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 75000, suffix: "+", label: "Active Users" },
              { value: 12000, suffix: "+", label: "Recipes" },
              { value: 500, suffix: "+", label: "Expert Chefs" },
              { value: 30, suffix: " min", label: "Avg Delivery", isTime: true },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 text-center border border-black/5 shadow-sm">
                <p className="text-[24px] font-bold text-[#c47a5b]">
                  <AnimatedStat target={stat.value} suffix={stat.suffix} isTime={stat.isTime} />
                </p>
                <p className="text-[13px] text-[#1e2b26]/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <h3 className="text-[18px] font-bold mb-4">Why Diet-o?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Sparkles, title: "AI-Powered Planning", desc: "Smart meal plans tailored to your taste and nutrition goals.", detail: "Our proprietary AI analyzes your dietary preferences, allergies, and goals to instantly generate 7-day meal plans. It continuously learns from your ratings to ensure you never get bored of eating healthy!" },
                { icon: Users, title: "Vibrant Community", desc: "Connect with 75,000+ food lovers and professional chefs.", detail: "Join live cooking challenges, share your daily plates, and discover secret recipes from expert chefs. Our community is your ultimate support system for staying on track." },
                { icon: Leaf, title: "Sustainable Eating", desc: "Reduce food waste with smart shopping lists and portion guides.", detail: "We automatically consolidate your weekly ingredients into an optimized grocery list, preventing over-purchasing. Eat well while reducing your carbon footprint!" },
                { icon: TrendingUp, title: "Track Progress", desc: "Monitor your nutrition, weight, and health goals over time.", detail: "Seamlessly log your meals and track your macros. Our beautiful analytics dashboard provides deep insights into your energy levels and nutrient intake week over week." },
              ].map(item => (
                <motion.div layout whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setExpandedFeature(expandedFeature === item.title ? null : item.title)} key={item.title} className={`p-3 rounded-xl transition cursor-pointer ${expandedFeature === item.title ? 'bg-[#c47a5b]/5' : 'hover:bg-[#f7f5f2]'}`}>
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#c47a5b]/10 text-[#c47a5b] grid place-items-center shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[14px]">{item.title}</p>
                      <p className="text-[13px] text-[#1e2b26]/60 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedFeature === item.title && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-3 ml-[52px]">
                          <div className="bg-white/50 p-3 rounded-lg border border-[#c47a5b]/10">
                            <p className="text-[12px] text-[#1e2b26]/80 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-[#1e2b26] rounded-2xl p-8 text-white text-center">
            <h3 className="font-fraunces text-[24px] font-semibold">Start Your Journey Today</h3>
            <p className="mt-2 text-white/70 text-[15px]">Join thousands who've transformed their relationship with food.</p>
            <button onClick={() => onNavigate("recipes")} className="mt-5 rounded-full bg-[#c47a5b] px-8 py-3 font-semibold hover:bg-[#b46e52] transition active:scale-95">Explore Recipes</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FAQPage({ onNavigate }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#f7f5f2] pb-28 md:pb-8">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => onNavigate("home")} className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-fraunces">FAQ</h1>
        </div>
      </div>

      <motion.div animate={{ x: [-8, 8, -8] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
        <div className="max-w-6xl mx-auto px-4 mt-8 space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-[15px] font-semibold pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronRight size={18} className="text-[#1e2b26]/40 shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[14px] leading-relaxed text-[#1e2b26]/70">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <div className="bg-[#c47a5b]/10 rounded-2xl p-6 text-center mt-6">
            <h3 className="font-semibold text-[16px]">Still have questions?</h3>
            <p className="text-[14px] text-[#1e2b26]/70 mt-1">We're here to help you 24/7</p>
            <div className="flex justify-center gap-3 mt-4">
              <button onClick={() => alert("Email: hello@dieto.app")} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[13px] font-medium shadow-sm hover:shadow transition active:scale-95">
                <Mail size={14} /> Email Us
              </button>
              <button onClick={() => alert("Call: +1 (555) 123-4567")} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#c47a5b] text-white text-[13px] font-medium shadow-sm hover:bg-[#b46e52] transition active:scale-95">
                <Phone size={14} /> Call Us
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MealPlanPage({ onNavigate }: any) {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const meals: any = {
    Mon: [
      { type: "Breakfast", name: "Avocado Toast + Poached Egg", cal: 420, img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=200&fit=crop" },
      { type: "Lunch", name: "Grilled Salmon Bowl", cal: 580, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop" },
      { type: "Dinner", name: "Lentil Curry + Rice", cal: 520, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop" },
      { type: "Snack", name: "Greek Yogurt Parfait", cal: 180, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop" },
    ],
    Tue: [
      { type: "Breakfast", name: "Overnight Oats", cal: 350, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop" },
      { type: "Lunch", name: "Quinoa Power Salad", cal: 450, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop" },
      { type: "Dinner", name: "Sourdough + Tomato Soup", cal: 480, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop" },
      { type: "Snack", name: "Hummus & Pita", cal: 220, img: "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=200&h=200&fit=crop" },
    ],
    Wed: [
      { type: "Breakfast", name: "Green Smoothie", cal: 280, img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&h=200&fit=crop" },
      { type: "Lunch", name: "Chicken Wrap", cal: 520, img: "/images/chicken-wrap.jpg" },
      { type: "Dinner", name: "Stir-fry Veggies + Tofu", cal: 420, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop" },
      { type: "Snack", name: "Chia Pudding", cal: 190, img: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=200&h=200&fit=crop" },
    ],
    Thu: [
      { type: "Breakfast", name: "Protein Pancakes", cal: 460, img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop" },
      { type: "Lunch", name: "Falafel Wrap", cal: 480, img: "/images/falafel-wrap.jpg" },
      { type: "Dinner", name: "Veggie Burger", cal: 550, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop" },
      { type: "Snack", name: "Acai Bowl", cal: 310, img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200&h=200&fit=crop" },
    ],
    Fri: [
      { type: "Breakfast", name: "Berry Smoothie Bowl", cal: 340, img: "/images/berry-smoothie-bowl.jpg" },
      { type: "Lunch", name: "Sushi Platter", cal: 620, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop" },
      { type: "Dinner", name: "Margherita Pizza", cal: 680, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop" },
      { type: "Snack", name: "Kale Caesar Salad", cal: 240, img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=200&h=200&fit=crop" },
    ],
    Sat: [
      { type: "Breakfast", name: "Avocado Toast + Egg", cal: 420, img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=200&fit=crop" },
      { type: "Lunch", name: "Buddha Bowl", cal: 510, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop" },
      { type: "Dinner", name: "Chicken Biryani", cal: 640, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop" },
      { type: "Snack", name: "Iced Matcha Latte", cal: 150, img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=200&h=200&fit=crop" },
    ],
    Sun: [
      { type: "Breakfast", name: "Chia Pudding + Berries", cal: 290, img: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=200&h=200&fit=crop" },
      { type: "Lunch", name: "Kale Caesar Salad", cal: 350, img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=200&h=200&fit=crop" },
      { type: "Dinner", name: "Grilled Salmon Bowl", cal: 580, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop" },
      { type: "Snack", name: "Chocolate Lava Cake", cal: 380, img: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" },
    ],
  };
  const dayMeals = meals[selectedDay] || meals.Mon;
  const dayCal = dayMeals.reduce((s: number, m: any) => s + m.cal, 0);
  const weeklyTarget = 14000;
  const progressPercent = Math.min(Math.max((dayCal / weeklyTarget) * 100, 0), 100);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#f7f5f2] pb-28 md:pb-8 relative">
      <ZigZagBackground />
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => onNavigate("home")} className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-fraunces">Smart Meal Planning</h1>
        </div>
      </div>

      <motion.div animate={{ x: [8, -8, 8] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="max-w-6xl mx-auto px-4 mt-6 relative z-10">
          <div className="bg-[#c47a5b]/10 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-[13px] text-[#1e2b26]/60">Weekly Target</p>
                <p className="text-[22px] font-bold">14,000 <span className="text-[14px] font-normal text-[#1e2b26]/60">cal</span></p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-[#1e2b26]/60">{selectedDay} Total</p>
                <p className="text-[22px] font-bold text-[#c47a5b]">{dayCal} <span className="text-[14px] font-normal text-[#1e2b26]/60">cal</span></p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px] text-[#1e2b26]/70">
                <span>0</span>
                <span>{weeklyTarget.toLocaleString()}</span>
              </div>
              <div className="h-3 rounded-full bg-black/5 overflow-hidden">
                <div className="h-full rounded-full bg-[#c47a5b] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-5 overflow-x-auto pb-2 scrollbar-hide">
            {days.map(day => (
              <motion.button
                key={day}
                whileTap={{ scale: 0.88 }}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-center text-[13px] font-semibold transition ${selectedDay === day ? "bg-[#c47a5b] text-white shadow-md" : "bg-white text-[#1e2b26]/70 border border-black/5 hover:border-[#c47a5b]/30"}`}
              >
                {day}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={selectedDay} variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }} className="mt-5 space-y-3">
              {dayMeals.map((meal: any, i: number) => (
                <motion.div key={i} variants={itemVariants} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-black/5 shadow-sm">
                  <img src={meal.img || "/images/food-hero.jpg"} alt={meal.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#c47a5b]">{meal.type}</p>
                    <p className="text-[15px] font-semibold mt-0.5">{meal.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-bold">{meal.cal}</p>
                    <p className="text-[11px] text-[#1e2b26]/50">kcal</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button onClick={() => alert("Meal plan regenerated with AI!")} className="mt-6 w-full rounded-full bg-[#1e2b26] py-3.5 font-semibold text-white hover:bg-black transition active:scale-[0.98] flex items-center justify-center gap-2">
            <Sparkles size={16} /> Regenerate with AI
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NutritionPage({ onNavigate }: any) {
  const [period, setPeriod] = useState("Week");
  const [expandedStat, setExpandedStat] = useState<string | null>(null);
  const stats = [
    { label: "Calories", value: "12,450", target: "14,000", percent: 89, color: "#c47a5b", detail: "Energy intake from all macronutrients" },
    { label: "Protein", value: "342g", target: "400g", percent: 86, color: "#4ade80", detail: "Muscle building and recovery" },
    { label: "Carbs", value: "1,180g", target: "1,400g", percent: 84, color: "#60a5fa", detail: "Energy and brain function" },
    { label: "Fats", value: "380g", target: "490g", percent: 78, color: "#fbbf24", detail: "Hormones and nutrient absorption" },
    { label: "Fiber", value: "168g", target: "210g", percent: 80, color: "#a78bfa", detail: "Digestive health" },
    { label: "Water", value: "18.2L", target: "21L", percent: 87, color: "#22d3ee", detail: "Hydration and metabolism" },
  ];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#f7f5f2] pb-28 md:pb-8 relative">
      <ZigZagBackground />
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => onNavigate("home")} className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-fraunces">Nutrition Tracking</h1>
        </div>
      </div>

      <motion.div animate={{ x: [-8, 8, -8] }} transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="max-w-6xl mx-auto px-4 mt-6 relative z-10">
          <div className="flex gap-2 mb-5">
            {["Day", "Week", "Month"].map(p => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.88 }}
                onClick={() => setPeriod(p)}
                className={`px-5 py-2 rounded-full text-[13px] font-medium transition ${period === p ? "bg-[#c47a5b] text-white shadow-md" : "bg-white text-[#1e2b26]/70 border border-black/5 hover:border-[#c47a5b]/30"}`}
              >
                {p}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={period} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm mb-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[16px]">Nutrition Overview</h3>
                <span className="text-[13px] text-[#1e2b26]/50">{period}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, i) => (
                  <motion.button
                    key={s.label}
                    type="button"
                    onClick={() => setExpandedStat(expandedStat === s.label ? null : s.label)}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 25 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-[#f7f5f2] rounded-xl p-3.5 text-left transition-all cursor-pointer ${expandedStat === s.label ? "ring-2" : ""}`}
                    style={{
                      ...(expandedStat === s.label && {
                        outlineColor: s.color,
                        outlineStyle: "solid",
                        outlineWidth: "2px",
                        outlineOffset: "0px"
                      })
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-medium text-[#1e2b26]/70">{s.label}</span>
                      <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.percent}%</span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.percent}%` }}
                        transition={{ duration: 0.8, delay: 0.15 + i * 0.08 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[13px] font-bold">{s.value}</span>
                      <span className="text-[11px] text-[#1e2b26]/40">/ {s.target}</span>
                    </div>
                    {expandedStat === s.label && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[11px] text-[#1e2b26]/60 mt-2 pt-2 border-t border-black/5"
                      >
                        {s.detail}
                      </motion.p>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
            <h3 className="font-semibold text-[16px] mb-3">Daily Streak</h3>
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-[#c47a5b]/10 text-[#c47a5b] grid place-items-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-[22px] font-bold">14 Days</p>
                <p className="text-[13px] text-[#1e2b26]/60">You're on fire! Keep tracking.</p>
              </div>
            </div>
            <div className="flex gap-1.5 mt-4">
              {["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${i < 14 ? "bg-[#c47a5b] text-white" : "bg-black/5 text-[#1e2b26]/30"}`}>
                  {d}
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => alert("Synced with Apple Health!")} className="mt-5 w-full rounded-full bg-[#1e2b26] py-3.5 font-semibold text-white hover:bg-black transition active:scale-[0.98] flex items-center justify-center gap-2">
            <Sparkles size={16} /> Sync with Health App
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === productId);
      if (existing) return prev.map(c => c.id === productId ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: productId, qty: 1 }];
    });
    showToast("Added to kitchen!");
  };

  const updateQty = (productId: number, delta: number) => {
    setCart(prev => prev.map(c => c.id === productId ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const pageOrder = ["home", "recipes", "community", "about", "faq", "meal-plan", "nutrition"];
  const pageIndex = pageOrder.indexOf(page);

  const goNext = () => {
    if (pageIndex < pageOrder.length - 1) setPage(pageOrder[pageIndex + 1]);
  };
  const goPrev = () => {
    if (pageIndex > 0) setPage(pageOrder[pageIndex - 1]);
  };

  const swipeProps = {
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    canSwipeLeft: pageIndex < pageOrder.length - 1,
    canSwipeRight: pageIndex > 0,
  };

  const pageProps = {
    onNavigate: setPage,
    onCartOpen: () => setCartOpen(true),
    cart,
    onAddToCart: addToCart,
    onUpdateQty: updateQty,
    cartCount,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1e2b26] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SwipeablePage {...swipeProps}><HomePage {...pageProps} /></SwipeablePage>
          </motion.div>
        )}
        {page === "recipes" && (
          <motion.div key="recipes" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SwipeablePage {...swipeProps}><RecipesPage {...pageProps} /></SwipeablePage>
          </motion.div>
        )}

        {page === "community" && (
          <motion.div key="community" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SwipeablePage {...swipeProps}><CommunityPage {...pageProps} /></SwipeablePage>
          </motion.div>
        )}
        {page === "about" && (
          <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SwipeablePage {...swipeProps}><AboutUsPage {...pageProps} /></SwipeablePage>
          </motion.div>
        )}
        {page === "faq" && (
          <motion.div key="faq" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SwipeablePage {...swipeProps}><FAQPage {...pageProps} /></SwipeablePage>
          </motion.div>
        )}
        {page === "meal-plan" && (
          <motion.div key="meal-plan" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SwipeablePage {...swipeProps}><MealPlanPage {...pageProps} /></SwipeablePage>
          </motion.div>
        )}
        {page === "nutrition" && (
          <motion.div key="nutrition" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SwipeablePage {...swipeProps}><NutritionPage {...pageProps} /></SwipeablePage>
          </motion.div>
        )}
      </AnimatePresence>

      <DraggableZigZag />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onUpdateQty={updateQty} />

      <BottomNav
        page={page}
        onNavigate={(p: string) => { if (p !== "more") setPage(p); }}
        cartCount={cartCount}
      />

      <AnimatePresence>
        {toast && <Toast message={toast} />}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 8px); }
      `}</style>
    </div>
  );
}
