from HumGen3D import Human
import bpy

def create_human(name, age, height, skin_dict, body_dict, cloth_selection):
    # Human creation and customization logic
    human_options = Human.get_preset_options("male")  # Adjust as needed
    chosen_option = human_options[0]
    my_human = Human.from_preset(chosen_option)

    my_human.name = name
    my_human.age.set(age, False)
    # Additional attributes like height could be managed within the body_dict if applicable

    if skin_dict:  # Apply skin settings if provided
        my_human.skin.set_from_dict(skin_dict)

    my_human.keys.set_from_dict(body_dict)

    print(my_human.keys.as_dict())  # Debugging output

    cloths_options = my_human.clothing.outfit.get_options()
    chosen_cloth = cloths_options[cloth_selection] # Select specific one, or randomly
    my_human.clothing.outfit.set(chosen_cloth)

def customize_body_settings(muscularity, skinniness, overweight):
    # Return a body settings dictionary with the specified customization
    return {'height_200': 0.01875019073486328, 'height_150': 0.6176470588235294, 'aged_young': 0, 'aged_male': 0, 'Eye Distance': 0.18514759316830867, 'Eye Scale': 0.0, 'Eye Depth': -0.30156291157326165, 'Eye Height': 0.2427885274667239, 'Triceps': 1.0, 'Biceps': 1.0, 'Quad Muscles': 0.550000011920929, 'Hamstring Muscles': 1.0, 'Forearm Muscles': 1.0, 'Lower Butt Muscles': 1.0, 'Shoulder Muscles': 1.0, 'Chest Muscles': 1.0, 'Back Muscles': 0.9899999499320984, 'Calves Muscles': 1.0, 'Traps Muscles': 1.0, 'Upper Butt Muscles': 1.0, 'Stylized': 0.0, 'Neck Length': -0.38999995589256287, 'Neck Thickness': 1.0, 'Shin Length': 0.0, 'Shin Thickness': 0.23999999463558197, 'Thigh Length': 0.0, 'Thigh Thickness': 0.36000001430511475, 'Foot Length': 0.0, 'Breast Size': 0.0, 'Hips Height': 0.0, 'Hips Size': 0.0, 'Waist Thickness': 0.0700000524520874, 'Chest Width': 0.0, 'Belly Size': -0.47999998927116394, 'Chest Height': 0.0, 'Shoulder Width': 0.0, 'Hand Thickness': 0.0, 'Forearm Length': 0.0, 'Hand Length': 0.0, 'Forearm Thickness': 0.0, 'Hand Width': 0.0, 'Upper Arm Length': 0.0, 'Upper Arm Thickness': 0.0, 'overweight': overweight, 'muscular': muscularity, 'skinny': skinniness, 'variation_8': 0.0, 'variation_9': 0.0, 'black': 0.0, 'variation_1': 0.0, 'variation_2': 0.0, 'variation_3': 0.0, 'variation_7': 0.0, 'caucasian': 1.0, 'variation_6': 0.0, 'variation_4': 0.0, 'variation_5': 0.0, 'asian': 0.0, 'variation_10': 0.0, 'variation_11': 0.0, 'nose_nostril_flare': -0.6327179704538421, 'nose_tip_length': -0.8487725055193236, 'nose_bridge_width': 0.6557668358710804, 'nose_height': -0.12184492804713656, 'nose_nostril_turn': 0.6108484556164653, 'nose_angle': 0.18948144493875302, 'nose_tip_width': -0.2393291715828389, 'nose_tip_angle': 0.47465517683367586, 'nose_location': -0.955751599512073, 'nose_bridge_height': 0.150912978380821, 'nose_tip_size': -0.3662466065514183, 'browridge_loc_vertical': -0.13371941472641163, 'forehead_size': -0.05758808277805849, 'browridge_center_size': 0.1991520226863476, 'browridge_loc_horizontal': 0.8966403147684088, 'temple_size': -0.2857421285306902, 'lip_width': -0.7404816442052241, 'lip_location': -0.08148203959308382, 'lip_cupid_bow': -0.7314067254408765, 'lip_offset': -0.14740859733905473, 'lip_height': -0.4889542499448803, 'muzzle_location_vertical': -0.3256599522877246, 'muzzle_location_horizontal': -0.03925584643142739, 'ear_lobe_size': 0.3613308087169355, 'ear_turn': 0.20108936758824308, 'ear_width': -0.34717726597474374, 'ear_antihelix_shape': -0.55248830139831, 'ear_height': -0.1690467150615507, 'chin_dimple': 1.0038697955184326, 'chin_size': 0.43126480296275443, 'chin_height': 0.2888004428167468, 'chin_width': 0.20386576699428274, 'jaw_width': -0.19163641449872523, 'jaw_location_vertical': -0.059419810772153844, 'jaw_location_horizontal': -0.5731347157013524, 'cheek_fullness': 0.020581003254987122, 'cheek_zygomatic_proc': -0.28178264762630023, 'cheek_zygomatic_bone': 0.20404781071357248, 'eyelid_fat_pad': 0.4130930447545496, 'eye_tilt': 0.4609211065404353, 'eyelid_shift_vertical': -0.06166291993610374, 'eye_orbit_size': 0.643712548908235, 'eyelid_rotation': -0.47845235363196764, 'eyelid_shift_horizontal': -0.17025506999998358, 'eye_height': 0.29899898626340926, 'eye_width': 1.0696405919749632, 'Male': 1.0, 'LIVE_KEY_PERMANENT': 1.0, 'LIVE_KEY_TEMP_': 0.0}
    

def main():
    # Example inputs - these could be replaced with dynamic inputs from a UI or command line arguments
    print("Hello from backend!")
    bpy.ops.object.select_all(action='DESELECT')  # Deselect all objects

# Select the default objects by their type
    for obj in bpy.context.scene.objects:
        if obj.type in ['CAMERA', 'LIGHT', 'MESH']:
            obj.select_set(True)

# Delete the selected objects
    bpy.ops.object.delete() 
    
    name = "Mayank Yadav"
    age = 22
    height = 180  # Example, adjust according to how you wish to use it
    cloth_selection = 0 

    # Example skin settings dictionary
    skin_dict = {'tone': 1.340, 'redness': -0.025, 'saturation': 1.8, 'normal_strength': 4.69, 'roughness_multiplier': 2328.169, 'freckles': 0.5, 'splotches': 0.297468364238739, 'texture.set': 'textures/male/Default 4K/Male 10.png', 'cavity_strength': 0.0, 'gender_specific': {'mustache_shadow': 0.0, 'beard_shadow': 0.0}}

    # Customize body settings based on inputs or logic
    body_dict = customize_body_settings(muscularity=1.0, skinniness=-1.0, overweight=0.0)

        # Call the function to create and customize the human model
    create_human(name, age, height, skin_dict, body_dict, cloth_selection)
    model_export_path = "/Users/aryan/Documents/GitHub/VFiT-Codebase/frontend/public/GeneratedModel.glb"

# Export the model with materials in GLB format
    bpy.ops.export_scene.gltf(
        filepath=model_export_path,
        export_format='GLB',
        use_selection=False,  # Export the whole scene; set to True to export only selected objects
        export_apply=True,  # Apply modifiers (if you want to apply them)
        export_materials='EXPORT',  # Export materials
        export_colors=True,  # Export vertex colors
        export_extras=True,  # Export custom properties as glTF extras
        export_yup=True,  # Convert to Y-up coordinate system if necessary
    )


if __name__ == "__main__":
    main()
