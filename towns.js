Tchaikovsky_town = {region: Tchaikovsky, town_id: "Tchaikovsky", town_name: "Чайковский", town_restorans: [Tchaikovsky_restaurant], map_image: "chaik_map.png", label_image: "Chaik_letters.png"}
Perm_town = {region: Perm, town_id: "Perm",town_name: "Пермь", town_restorans: [], map_image: "Perm_map.png", label_image: "Chaik_letters.png"}

all_regions_town = [Tchaikovsky_town, Perm_town,]

let all_towns = new Map();
all_regions_town.forEach(town => {
   let temp_restorans_list = new Map();
   town.town_restorans.forEach(restoran => {
	   temp_restorans_list.set(restoran.id, restoran.name)
   });
   all_towns.set(town.town_id, {name: town.town_name, restorans: temp_restorans_list});
});