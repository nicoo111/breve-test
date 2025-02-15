//import { v4 as uuidv4 } from 'uuid';
import supabase from './SupabaseClient';

const postCartData = async (selectedItem, quantity, specialInstructions, selectedAddons, closeModal) => {
    const cartItemId = Math.floor(1000 + Math.random() * 9000);

    const { data, error } = await supabase
    .from('cart_item')
    .insert([{
        cart_item_id: cartItemId,
        item_id: selectedItem.item_id,
        quantity: quantity, 
        special_notes: specialInstructions,
    }]);

    if (error) {
        console.error(`Error inserting cart data: ${error.message}`);
        return;
    }

    console.log("Cart item added:", data);

    if (selectedAddons.length > 0) {
        const addonData = selectedAddons.map(addon => ({
            cart_item_id: cartItemId,
            item_addon_id: addon.addon_id,
        }));

        const { error: addonError } = await supabase
        .from('cart_item_addon')
        .insert(addonData);

        if (addonError) {
            console.error(`Error inserting add-ons: ${addonError.message}`);
            return;
        }

        console.log("Add-ons added:", addonData);
    }

    closeModal();
};

export default postCartData;

