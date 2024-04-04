from HumGen3D import Human
import bpy
import sys
import argparse

def create_human(name, age, height, body_dict, cloth_selection, preset):
    # Human creation and customization logic
    
    human_options = Human.get_preset_options("male")  # Adjust as needed
    chosen_option = human_options[preset]
    my_human = Human.from_preset(chosen_option)

    my_human.name = name
    my_human.age.set(age, False)

    # Additional attributes like height could be managed within the body_dict if applicable


    my_human.keys.set_from_dict(body_dict)

    print(my_human.keys.as_dict())  # Debugging output

    cloths_options = my_human.clothing.outfit.get_options()
    chosen_cloth = cloths_options[cloth_selection] # Select specific one, or randomly
 
    
    # Adjust as needed
    my_human.clothing.outfit.set(chosen_cloth)

    return my_human

def customize_body_settings(muscularity, skinniness, overweight):
    # Return a body settings dictionary with the specified customization
    return {'height_200': 0.01875019073486328, 'height_150': 0.6176470588235294, 'aged_young': 0, 'aged_male': 0, 'Eye Distance': 0.18514759316830867, 'Eye Scale': 0.0, 'Eye Depth': -0.30156291157326165, 'Eye Height': 0.2427885274667239, 'Triceps': 1.0, 'Biceps': 1.0, 'Quad Muscles': 0.550000011920929, 'Hamstring Muscles': 1.0, 'Forearm Muscles': 1.0, 'Lower Butt Muscles': 1.0, 'Shoulder Muscles': 1.0, 'Chest Muscles': 1.0, 'Back Muscles': 0.9899999499320984, 'Calves Muscles': 1.0, 'Traps Muscles': 0.0, 'Upper Butt Muscles': 1.0, 'Stylized': 0.0, 'Neck Length': -0.38999995589256287, 'Neck Thickness': 1.0, 'Shin Length': 0.0, 'Shin Thickness': 0.23999999463558197, 'Thigh Length': 0.0, 'Thigh Thickness': 0.36000001430511475, 'Foot Length': 0.0, 'Breast Size': 0.0, 'Hips Height': 0.0, 'Hips Size': 0.0, 'Waist Thickness': 0.0700000524520874, 'Chest Width': 0.0, 'Belly Size': -0.47999998927116394, 'Chest Height': 0.0, 'Shoulder Width': 0.0, 'Hand Thickness': 0.0, 'Forearm Length': 0.0, 'Hand Length': 0.0, 'Forearm Thickness': 0.0, 'Hand Width': 0.0, 'Upper Arm Length': 0.0, 'Upper Arm Thickness': 0.0, 'overweight': overweight, 'muscular': muscularity, 'skinny': skinniness, 'variation_8': 0.0, 'variation_9': 0.0, 'black': 0.0, 'variation_1': 0.0, 'variation_2': 0.0, 'variation_3': 0.0, 'variation_7': 0.0, 'caucasian': 1.0, 'variation_6': 0.0, 'variation_4': 0.0, 'variation_5': 0.0, 'asian': 0.0, 'variation_10': 0.0, 'variation_11': 0.0, 'nose_nostril_flare': -0.6327179704538421, 'nose_tip_length': -0.8487725055193236, 'nose_bridge_width': 0.6557668358710804, 'nose_height': -0.12184492804713656, 'nose_nostril_turn': 0.6108484556164653, 'nose_angle': 0.18948144493875302, 'nose_tip_width': -0.2393291715828389, 'nose_tip_angle': 0.47465517683367586, 'nose_location': -0.955751599512073, 'nose_bridge_height': 0.150912978380821, 'nose_tip_size': -0.3662466065514183, 'browridge_loc_vertical': -0.13371941472641163, 'forehead_size': -0.05758808277805849, 'browridge_center_size': 0.1991520226863476, 'browridge_loc_horizontal': 0.8966403147684088, 'temple_size': -0.2857421285306902, 'lip_width': -0.7404816442052241, 'lip_location': -0.08148203959308382, 'lip_cupid_bow': -0.7314067254408765, 'lip_offset': -0.14740859733905473, 'lip_height': -0.4889542499448803, 'muzzle_location_vertical': -0.3256599522877246, 'muzzle_location_horizontal': -0.03925584643142739, 'ear_lobe_size': 0.3613308087169355, 'ear_turn': 0.20108936758824308, 'ear_width': -0.34717726597474374, 'ear_antihelix_shape': -0.55248830139831, 'ear_height': -0.1690467150615507, 'chin_dimple': 1.0038697955184326, 'chin_size': 0.43126480296275443, 'chin_height': 0.2888004428167468, 'chin_width': 0.20386576699428274, 'jaw_width': -0.19163641449872523, 'jaw_location_vertical': -0.059419810772153844, 'jaw_location_horizontal': -0.5731347157013524, 'cheek_fullness': 0.020581003254987122, 'cheek_zygomatic_proc': -0.28178264762630023, 'cheek_zygomatic_bone': 0.20404781071357248, 'eyelid_fat_pad': 0.4130930447545496, 'eye_tilt': 0.4609211065404353, 'eyelid_shift_vertical': -0.06166291993610374, 'eye_orbit_size': 0.643712548908235, 'eyelid_rotation': -0.47845235363196764, 'eyelid_shift_horizontal': -0.17025506999998358, 'eye_height': 0.29899898626340926, 'eye_width': 1.0696405919749632, 'Male': 1.0, 'LIVE_KEY_PERMANENT': 1.0, 'LIVE_KEY_TEMP_': 0.0}


def main():
    # Example inputs - these could be replaced with dynamic inputs from a UI or command line arguments
    print("Hello from backend! 2")
    bpy.ops.object.select_all(action='DESELECT')  # Deselect all objects

    # Select the default objects by their type
    for obj in bpy.context.scene.objects:
        if obj.type in ['CAMERA', 'LIGHT', 'MESH']:
            obj.select_set(True)

    # Delete the selected objects
    bpy.ops.object.delete()

    argv = sys.argv
    try:
        index = argv.index("--") + 1
    except ValueError:
        index = len(argv)

    argv = argv[index:]
    age = argv[0]
    height = argv[1]
    muscularity = argv[2]
    skinny = argv [3]
    overweight = argv[4]
    cloth_selection = argv[5]
    preset = argv[6]    
    username = argv[7]
    output_directory = argv[8]
    #error logging
    '''
    with open('output.log', 'w') as f:
    # Redirect stdout to the file
        sys.stdout = f

    # Print variables or messages
        print('Variable:', age, height, muscularity, skinny, overweight, skinColor)

    # Restore stdout
        sys.stdout = sys.__stdout__
'''
    #human generation

    name = username
    #age = 22
    #height = 180  # Example, adjust according to how you wish to use it
    # cloth_selection = cloth_selection  # Example, adjust according to how you wish to use it

    if not (age == ''):
        age = int(age)
    else:
        age = 22

    if not (height ==''):
        height = int(height)
    else:
        height = 180

    if muscularity == '':
        muscularity = 0.5
    else:
        muscularity = (int(muscularity) - 5)/5

    if skinny == '':
        skinny = -0.5
    else:
        skinny = (int(skinny) - 5)/5

    if overweight == '':
        overweight = 0.0
    else:
        overweight = (int(overweight) - 5)/5
        
    if not (cloth_selection ==''):
        cloth_selection = int(cloth_selection)
    else:
        cloth_selection = 0
        
    if not (preset ==''):
        preset = int(preset)
    else:
        preset = 0

    # Customize body settings based on inputs or logic
    body_dict = customize_body_settings(muscularity=muscularity, skinniness=skinny, overweight=overweight)

        # Call the function to create and customize the human model
    my_human= create_human(name, age, height, body_dict, cloth_selection, preset)
    temp_directory = f"{output_directory}/{name}.glb"
    # Export the model with materials in GLB format
    bpy.ops.export_scene.gltf(
        filepath=temp_directory,
        export_format='GLB',
        use_selection=False,  # Export the whole scene; set to True to export only selected objects
        export_apply=True,  # Apply modifiers (if you want to apply them)
        export_materials='EXPORT',  # Export materials
        export_colors=True,  # Export vertex colors
        export_extras=True,  # Export custom properties as glTF extras
        export_yup=True,  # Convert to Y-up coordinate system if necessary
    )
    
    my_human.process.baking.bake_all()
    
    # Function to save all baked images to disk
    def save_baked_images(directory):
        for image in bpy.data.images:
            # Skip 'Render Result' or any image without data
            if image.name == 'Render Result' or image.size[0] == 0:
                print(f"Skipping: {image.name} (no data)")
                continue
            filepath = f"{directory}/{image.name}.png"  # Define the file path for saving
            image.save_render(filepath)
            print(f"Saved: {filepath}")


    # Save the baked images locally
    # Replace "/path/to/save/" with the actual path where you want to save the images
    save_baked_images(output_directory)

    # Make sure to adjust the save path to a valid directory on your system.

    # Export the model with materials in GLB format

    bpy.ops.wm.quit_blender()

if __name__ == "__main__":
    main()