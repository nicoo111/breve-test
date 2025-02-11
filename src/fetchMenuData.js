import supabase from "./SupabaseClient";

const fetchMenuData = async () => {
  try {

    const { data: menuData, error: menuError } = await supabase
      .from("menu")
      .select("*");
    if (menuError) throw new Error(`Error fetching menu: ${menuError.message}`);


    const { data: menuSizesData, error: menuSizesError } = await supabase
      .from("menu_sizes")
      .select("*");
    if (menuSizesError)
      throw new Error(`Error fetching menu sizes: ${menuSizesError.message}`);


    const { data: menuAddonsData, error: menuAddonsError } = await supabase
      .from("menu_addons")
      .select("*");
    if (menuAddonsError)
      throw new Error(`Error fetching menu addons: ${menuAddonsError.message}`);

    const combinedData = menuData.map((menuItem) => {
      const matchingSizes = menuSizesData
        .filter((size) => size.item_id === menuItem.item_id)
        .map((size) => ({
          size_id: size.size_id,
          name: size.name,
          size_price: size.size_price,
        }));
    
      const minPrice =
        matchingSizes.length > 0
          ? Math.min(...matchingSizes.map((size) => size.size_price))
          : 0;
    
      const matchingAddons = menuAddonsData
        .filter((addon) => addon.item_id === menuItem.item_id)
        .map((addon) => ({
          addon_id: addon.addon_id,
          addon_name: addon.addon_name,
          addon_price: addon.addon_price,
        }));
    
      return {
        item_id: menuItem.item_id,
        item_name: menuItem.item_name,
        item_description: menuItem.item_description,
        item_preptime_min: menuItem.item_preptime_min,
        item_preptime_max: menuItem.item_preptime_max,
        item_category: menuItem.item_category,
        item_price: minPrice,
        sizes: matchingSizes,
        addons: matchingAddons,
      };
    });
    console.log("Fetched Menu Data:", combinedData);

    return combinedData;
  } catch (error) {
    console.error("Error fetching menu data:", error.message);
    return [];
  }
};

export default fetchMenuData;