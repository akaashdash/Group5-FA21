import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as Rectangle

DIMENSION = 0.08
fig, ax = plt.subplots(1)

# takes in the starting point and draws a single square in a specific color based on the given number

def draw_element(num, starting_point):
    if 0 <= num <= 8:
        color1 = 'g'
    elif 9 <= num <= 17:
        color1 = 'b'
    elif 18 <= num <= 26:
        color1 = '#FFFF00'
    elif 27 <= num <= 35:
        color1 = 'w'
    elif 36 <= num <= 44:
        color1 = "#f09029"
    elif 45 <= num <= 53:
        color1 = 'r'
    rect = Rectangle.Rectangle(starting_point, DIMENSION, DIMENSION, linewidth=1, edgecolor='k', facecolor=color1)
    ax.add_patch(rect)


# draws each individual square on a specified face with a given starting point
def draw_face(array, x, y):
    x_shift = 0
    y_shift = 0
    for r in array:
        for c in r:
            if x_shift >= (3 * DIMENSION):
                x_shift = 0
                y_shift -= DIMENSION
            draw_element(c, (x + x_shift, y + y_shift))
            x_shift += DIMENSION
            if abs(y_shift) >= (3 * DIMENSION):
                break


# draws each of the 6 faces of the cube in the 2D layout
def draw_cube(model, x, y):
    draw_face(model[5, :, :], x, y)
    draw_face(model[0, :, :], x - (3 * DIMENSION), y)
    draw_face(model[1, :, :], x + (3 * DIMENSION), y)
    draw_face(model[2, :, :], x, y + (3 * DIMENSION))
    draw_face(model[3, :, :], x, y - (3 * DIMENSION))
    draw_face(model[4, :, :], (x + (6 * DIMENSION)), y)
    # draw_face(5, x, y)

