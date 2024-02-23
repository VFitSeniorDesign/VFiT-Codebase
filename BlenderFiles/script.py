import bpy

# Configuration
object_name = "Wolf3D_Body"
vertex_groups = {
    "Waist_Side": 1.05,  # Scale factor for main hips
}

def scale_vertex_group(obj, group_name, scale_factor):
    """Function to scale a specific vertex group of an object."""
    # Ensure we're working with a mesh
    if obj.type != 'MESH':
        print(f"The object {object_name} is not a mesh.")
        return

    # Deselect all objects
    bpy.ops.object.select_all(action='DESELECT')
    
    # Select and make the object active
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    
    # Switch to Edit mode
    bpy.ops.object.mode_set(mode='EDIT')
    
    # Make sure all vertices are deselected initially
    bpy.ops.mesh.select_all(action='DESELECT')
    
    # Switch to vertex select mode
    bpy.ops.mesh.select_mode(type='VERT')
    
    # Select the vertex group
    bpy.ops.object.vertex_group_set_active(group=group_name)
    bpy.ops.object.vertex_group_select()
    
    # Scale the selected vertices
    bpy.ops.transform.resize(value=(scale_factor, scale_factor, scale_factor))
    
    # Apply the scale
    bpy.ops.object.mode_set(mode='OBJECT')

# Get the object
obj = bpy.data.objects.get(object_name)

if obj:
    for group_name, scale_factor in vertex_groups.items():
        scale_vertex_group(obj, group_name, scale_factor)
else:
    print(f"The object {object_name} was not found.")
