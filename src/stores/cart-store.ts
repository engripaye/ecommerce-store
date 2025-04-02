import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

type CartStore = {
    items: CartItem[];
    isLoaded: boolean;
    cartId: string | null;
    setStore: (store: Partial<CartStore>) => void;
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    open: () => void;
    close: () => void;
    setLoaded: (loaded: boolean) => void;
    syncWithUser: () => Promise<void>;
    getTotalItems: () => number;
    getTotalPrice: () => number;

}

export const useCartStore = create<CartStore>() (
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            isLoaded: false,
            cartId: null,

            setStore: (strore) => set(strore),

            addItem: async (item) => {
                const { cartId } = get();
                if (!cartId) {
                    return;
                }

                const updatedCart = await updateCartItem(cartId, item.id, {
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    quantity: item.quantity,
                });

                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if(existingItem) {
                        return {
                            ...state,
                            cartId: updatedCart.id,
                            items: state.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity} : i)
                        }
                    }
                    return {
                        ...state,
                        cartId: updatedCart.id,
                        items: [...state.items, { ...item }],
                    };
                });
            },

            removeItem: async (id) => {
                const { cartId } = get();
                if (!cartId) {
                    return;
                }

                const updatedCart = await updateCartItem(cartId, id, {
                    quantity: 0,
                });

                set((state) => {
                    return {
                        ...state,
                        cartId: updatedCart.id,
                        items: state.items.filter((item) => item.id !== id)
                    };
                });
            },

            updateQuantity: async (id, quantity) => {
                const { cartId } = get();
                if (!cartId) {
                    return;
                }

                const updatedCart = await updateCartItem(cartId, id, {
                    quantity: quantity,
                });

                set((state) => ({
                    ...state,
                    cartId: updatedCart.id,
                    items: state.items.map((item) => item.id === id ? { ...item, quantity } : item)
                }));
            },

            syncWithUser: async () => {
                const { cartId } = get();
                if(!cartId) {
                    const cart = await getOrCreateCart();
                    set((state) => ({
                        ...state,
                        cartId: cart.id,
                        items: cart.items
                    }));
                }
                const syncedCart = await syncCartWithUser(cartId);
                if(syncedCart) {
                    set((state) => ({
                        ...state,
                        cartId: syncedCart.id,
                        items: syncedCart.items,
                    }))
                }
            },

            clearCart: () => {
                set((state) => ({ ...state, items: [] }));
            },

            open: () => {
                set((state) => ({ ...state, isOpen: true }));
            },
            close: () => {
                set((state) => ({ ...state, isOpen: false }));
            },

            setLoaded: (loaded) => {
                set((state) => ({ ...state, isLoaded: loaded }));
            },

            getTotalItems: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),

            
            
            
        
        (
            name: 'cart-storage',
            skipHydration: true,

        )
    )
);