
import supabase from "./SupabaseClient";


const fetchMenuData = async () => {
  try {
    const { data: menuData, error: menuError } = await supabase
      .from("menu")
      .select("*");
    if (menuError) throw new Error(`Error fetching menu: ${menuError.message}`);

    const { data: itemSizesData, error: itemSizesError } = await supabase
      .from("item_size")
      .select("*");
    if (itemSizesError) throw new Error(`Error fetching sizes: ${itemSizesError.message}`);

    const { data: itemAddonsData, error: itemAddonsError } = await supabase
      .from("item_addon")
      .select("*");
    if (itemAddonsError) throw new Error(`Error fetching add-ons: ${itemAddonsError.message}`);

    const { data: itemAddonListData, error: itemAddonListError } = await supabase
      .from("item_addon_list")
      .select("*");
    if (itemAddonListError) throw new Error(`Error fetching add-on lists: ${itemAddonListError.message}`);

    //pang array
    const groupedMenu = {};

    menuData.forEach((menuItem) => {
      const {
        item_id,
        item_name,
        item_description,
        item_category,
        isavailable,
        item_preptime_min,
        item_preptime_max,
        item_size_id,
        item_price
      } = menuItem;

      if (!groupedMenu[item_name]) {
        groupedMenu[item_name] = {
          item_id,
          item_name,
          item_description,
          item_category,
          is_available: isavailable,
          item_preptime_min,
          item_preptime_max,
          sizes: [],
          addons: []
        };
      }

      const matchingSize = itemSizesData.find(size => size.item_size_id === item_size_id);
      groupedMenu[item_name].sizes.push({
        size: matchingSize ? matchingSize.size_name : "Unknown",
        price: item_price
      });


      const matchingAddonIds = itemAddonListData
        .filter(list => list.item_id === item_id)
        .map(list => list.item_addon_id);
      const matchingAddons = itemAddonsData.filter(addon => matchingAddonIds.includes(addon.item_addon_id));

      matchingAddons.forEach(addon => {
        if (!groupedMenu[item_name].addons.some(a => a.addon_id === addon.item_addon_id)) {
          groupedMenu[item_name].addons.push({
            addon_id: addon.item_addon_id,
            addon_name: addon.addon_name,
            addon_price: addon.addon_price
          });
        }
      });
    });

    // nagawan array
    const finalMenuData = Object.values(groupedMenu);

    console.log("Fetched Menu Data:", finalMenuData);
    return finalMenuData;
  } catch (error) {
    console.error("Error fetching menu data:", error.message);
    return [];
  }
};

export default fetchMenuData;
