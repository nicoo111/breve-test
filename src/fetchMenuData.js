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


    const combinedData = menuData.map((menuItem) => {
      const matchingSizes = menuSizesData
        .filter((size) => size.item_id === menuItem.item_id)
        .map((size) => size.size_price);
    
      const minPrice = matchingSizes.length > 0 ? Math.min(...matchingSizes) : 0;
    
      return {
        item_id: menuItem.item_id,
        item_name: menuItem.item_name,
        item_description: menuItem.item_description,
        item_preptime_min: menuItem.item_preptime_min,
        item_preptime_max: menuItem.item_preptime_max,
        item_category: menuItem.item_category,
        item_price: minPrice,
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
