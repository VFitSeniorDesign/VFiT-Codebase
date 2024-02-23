from HumGen3D import Human

human_options = Human.get_preset_options("male") # gender 

# Choose a preset option, either using the random module or directly
chosen_option = human_options[0] # we can change preset here to get different human
my_human = Human.from_preset(chosen_option)

# here we will customise the human
my_human.name = "John Doe"

my_human.age.set(22,False) # set age to 22
#my_human.height.set(180,False) # set height to 180 cm, this does not seem to work for now



# skin settings can be changed by setting a dictionary, we will use values that are already preset for different skin colors and when the user selects them, we will use that dict. 

#my_dict= {'tone': 1.340, 'redness': -0.025, 'saturation': 1.8, 'normal_strength': 4.69, 'roughness_multiplier': 2328.169, 'freckles': 0.5, 'splotches': 0.297468364238739, 'texture.set': 'textures/male/Default 4K/Male 10.png', 'cavity_strength': 0.0, 'gender_specific': {'mustache_shadow': 0.0, 'beard_shadow': 0.0}}

#my_human.skin.set_from_dict(my_dict)

print(my_human.body.keys) # this prints in terminal so make sure to run blender through terminal and not by opening by clicking 

# need to figure out how we can change body proportions