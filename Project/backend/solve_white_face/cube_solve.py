import matplotlib.pyplot as plt
import numpy as np
import random

from cube_view.cube_2d import draw_cube
from cube_controller.cube_transformation import transform_cube, get_matrix

solved_cube = np.arange(54).reshape(6, 3, 3)
WHITE_LIST = [27, 28, 29, 30, 31, 32, 33, 34, 35]

move = ['R', 'R\'', 'L', 'L\'', 'U', 'U\'', 'F', 'F\'', 'B', 'B\'', 'D', 'D\'']


rev_moves = {'R': 'R\'', 'L': 'L\'', 'U': 'U\'', 'F': 'F\'', 'B': 'B\'', 'D': 'D\'', 'R\'': 'R', 'L\'': 'L',
             'U\'': 'U', 'F\'': 'F', 'B\'': 'B', 'D\'': 'D'}

num_move = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


def scramble(cube, num):
    # tfm_mtx = np.eye(54)
    tfm_list = []
    for x in range(num):
        tfm = random.randint(0, 11)
        # Performs one of the twists from 0 to 11
        # tfm_mtx = tfm_mtx.dot(get_matrix(cube, move[tfm]))
        cube = transform_cube(cube, move[tfm])
        tfm_list.append(move[tfm])
        # Keeps track of the moves that we have done in tfm list 
    return cube, tfm_list
    # return cube, tfm_mtx


def check_white_pieces(cube):
    missing_piece_list = []
    if cube[3][0][0] != 27:
        missing_piece_list.append(27)
    if cube[3][0][1] != 28:
        missing_piece_list.append(28)
    if cube[3][0][2] != 29:
        missing_piece_list.append(29)
    if cube[3][1][0] != 30:
        missing_piece_list.append(30)
    if cube[3][1][2] != 32:
        missing_piece_list.append(32)
    if cube[3][2][0] != 33:
        missing_piece_list.append(33)
    if cube[3][2][1] != 34:
        missing_piece_list.append(34)
    if cube[3][2][2] != 35:
        missing_piece_list.append(35)
    return missing_piece_list
# Shows if we do not have white solved

def white_keep_position(cube, og_in_position_list):
    keep_positions = True
    in_position_list = []
    missing_piece_list = check_white_pieces(cube)
    for i in WHITE_LIST:
        if i not in missing_piece_list:
            in_position_list.append(i)
    for j in og_in_position_list:
        if j not in in_position_list:
            keep_positions = False
    return keep_positions
# Function to check if white is still in the right positions

def check_white_pos2(cube, white_element1, white_element2):
    in_pos1 = False
    in_pos2 = False

    if white_element1 == 27:
        in_pos1 = cube[3][0][0] == 27
    if white_element1 == 28:
        in_pos1 = cube[3][0][1] == 28
    if white_element1 == 29:
        in_pos1 = cube[3][0][2] == 29
    if white_element1 == 30:
        in_pos1 = cube[3][1][0] == 30
    if white_element1 == 32:
        in_pos1 = cube[3][1][2] == 32
    if white_element1 == 33:
        in_pos1 = cube[3][2][0] == 33
    if white_element1 == 34:
        in_pos1 = cube[3][2][1] == 34
    if white_element1 == 35:
        in_pos1 = cube[3][2][2] == 35

    if white_element2 == 27:
        in_pos2 = cube[3][0][0] == 27
    if white_element2 == 28:
        in_pos2 = cube[3][0][1] == 28
    if white_element2 == 29:
        in_pos2 = cube[3][0][2] == 29
    if white_element2 == 30:
        in_pos2 = cube[3][1][0] == 30
    if white_element2 == 32:
        in_pos2 = cube[3][1][2] == 32
    if white_element2 == 33:
        in_pos2 = cube[3][2][0] == 33
    if white_element2 == 34:
        in_pos2 = cube[3][2][1] == 34
    if white_element2 == 35:
        in_pos2 = cube[3][2][2] == 35

    return in_pos1 and in_pos2


def position_white_pieces2(cube, white_element1, white_element2):
    og_in_position_list = []
    missing_piece_list = check_white_pieces(cube)
    for i in WHITE_LIST:
        if i not in missing_piece_list:
            og_in_position_list.append(i)
    correct_tfm_string = ""
    stop = False
    if check_white_pos2(cube, white_element1, white_element2):
        return(cube)
    for i in range(0, 12):
        if stop:
            break
        if check_white_pos2(transform_cube(cube, move[i]), white_element1, white_element2) and white_keep_position(
                transform_cube(cube, move[i]), og_in_position_list):
            correct_tfm_string = move[i]
            break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)
    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            tfm_string = move[i] + "," + move[j]
            if check_white_pos2(transform_cube(cube, tfm_string), white_element1, white_element2) and white_keep_position(
                    transform_cube(cube, tfm_string), og_in_position_list):
                stop = True
                correct_tfm_string = tfm_string
                break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                tfm_string = move[i] + "," + move[j] + "," + move[k]
                if check_white_pos2(transform_cube(cube, tfm_string), white_element1, white_element2) and white_keep_position(
                        transform_cube(cube, tfm_string), og_in_position_list):
                    stop = True
                    correct_tfm_string = tfm_string
                    break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l]
                    if check_white_pos2(transform_cube(cube, tfm_string), white_element1, white_element2) and white_keep_position(
                            transform_cube(cube, tfm_string), og_in_position_list):
                        stop = True
                        correct_tfm_string = tfm_string
                        break

    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    for m in range(0, 12):
                        if stop:
                            break
                        tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l] + "," + move[m]
                        if check_white_pos2(transform_cube(cube, tfm_string), white_element1, white_element2) and white_keep_position(
                                transform_cube(cube, tfm_string), og_in_position_list):
                            stop = True
                            correct_tfm_string = tfm_string
                            break

    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    for m in range(0, 12):
                        if stop:
                            break
                        for n in range(0, 12):
                            if stop:
                                break
                            tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l] + "," + move[m] + "," + \
                                         move[n]
                            if check_white_pos2(transform_cube(cube, tfm_string), white_element1, white_element2) and white_keep_position(
                                    transform_cube(cube, tfm_string), og_in_position_list):
                                stop = True
                                correct_tfm_string = tfm_string
                                break

    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    for m in range(0, 12):
                        if stop:
                            break
                        for n in range(0, 12):
                            if stop:
                                break
                            for r in range(0, 12):
                                if stop:
                                    break
                                tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l] + "," + move[
                                    m] + "," + move[n] + "," + move[r]
                                if check_white_pos2(transform_cube(cube, tfm_string),
                                                   white_element1, white_element2) and white_keep_position(
                                        transform_cube(cube, tfm_string), og_in_position_list):
                                    stop = True
                                    correct_tfm_string = tfm_string
                                    break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

def check_white_pos1(cube, white_element):
    in_pos = False
    if white_element == 27:
        in_pos = cube[3][0][0] == 27
    if white_element == 28:
        in_pos = cube[3][0][1] == 28
    if white_element == 29:
        in_pos = cube[3][0][2] == 29
    if white_element == 30:
        in_pos = cube[3][1][0] == 30
    if white_element == 32:
        in_pos = cube[3][1][2] == 32
    if white_element == 33:
        in_pos = cube[3][2][0] == 33
    if white_element == 34:
        in_pos = cube[3][2][1] == 34
    if white_element == 35:
        in_pos = cube[3][2][2] == 35
    return in_pos


def position_white_pieces1(cube, white_element):
    og_in_position_list = []
    missing_piece_list = check_white_pieces(cube)
    for i in WHITE_LIST:
        if i not in missing_piece_list:
            og_in_position_list.append(i)
    correct_tfm_string = ""
    stop = False

    if check_white_pos1(cube, white_element):
        return(cube)

    for i in range(0, 12):
        if stop:
            break
        if check_white_pos1(transform_cube(cube, move[i]), white_element) and white_keep_position(
                transform_cube(cube, move[i]), og_in_position_list):
            correct_tfm_string = move[i]
            break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)
    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            tfm_string = move[i] + "," + move[j]
            if check_white_pos1(transform_cube(cube, tfm_string), white_element) and white_keep_position(
                    transform_cube(cube, tfm_string), og_in_position_list):
                stop = True
                correct_tfm_string = tfm_string
                break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                tfm_string = move[i] + "," + move[j] + "," + move[k]
                if check_white_pos1(transform_cube(cube, tfm_string), white_element) and white_keep_position(
                        transform_cube(cube, tfm_string), og_in_position_list):
                    stop = True
                    correct_tfm_string = tfm_string
                    break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l]
                    if check_white_pos1(transform_cube(cube, tfm_string), white_element) and white_keep_position(
                            transform_cube(cube, tfm_string), og_in_position_list):
                        stop = True
                        correct_tfm_string = tfm_string
                        break

    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    for m in range(0, 12):
                        if stop:
                            break
                        tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l] + "," + move[m]
                        if check_white_pos1(transform_cube(cube, tfm_string), white_element) and white_keep_position(
                                transform_cube(cube, tfm_string), og_in_position_list):
                            stop = True
                            correct_tfm_string = tfm_string
                            break

    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    for m in range(0, 12):
                        if stop:
                            break
                        for n in range(0, 12):
                            if stop:
                                break
                            tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l] + "," + move[m] + "," + \
                                         move[n]
                            if check_white_pos1(transform_cube(cube, tfm_string), white_element) and white_keep_position(
                                    transform_cube(cube, tfm_string), og_in_position_list):
                                stop = True
                                correct_tfm_string = tfm_string
                                break

    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)

    for i in range(0, 12):
        if stop:
            break
        for j in range(0, 12):
            if stop:
                break
            for k in range(0, 12):
                if stop:
                    break
                for l in range(0, 12):
                    if stop:
                        break
                    for m in range(0, 12):
                        if stop:
                            break
                        for n in range(0, 12):
                            if stop:
                                break
                            for r in range(0, 12):
                                if stop:
                                    break
                                tfm_string = move[i] + "," + move[j] + "," + move[k] + "," + move[l] + "," + move[
                                    m] + "," + move[n] + "," + move[r]
                                if check_white_pos1(transform_cube(cube, tfm_string),
                                                   white_element) and white_keep_position(
                                        transform_cube(cube, tfm_string), og_in_position_list):
                                    stop = True
                                    correct_tfm_string = tfm_string
                                    break
    if len(correct_tfm_string) != 0:
        return transform_cube(cube, correct_tfm_string)


# solve second layer
def check_edges(cube):
    edges_in_position = True
    if cube[0][1][0] != 3:
        edges_in_position = False
    if cube[1][1][2] != 14:
        edges_in_position = False
    if cube[5][1][0] != 48:
        edges_in_position = False
    if cube[5][1][2] != 50:
        edges_in_position = False
    return edges_in_position

# def insert_edge(cube, edge):
#
#
# def remove_edge(cube, edge):

#     wrong_edge_list = []
#     while cube[0][2][1] != 7:
#         transform_cube("F")
#     if cube[0][0][1] != 1 && cube[0][0][1] != 21:
#         wrong_edge_list.append(7)
#     if cube[2][0][1] != 1 & & cube[0][0][1] != 21:
#
#
#
# def rotate_edge(cube, edge):
#
# def insert_edge(cube, edge):
# # for the right
# # 'U,R,U\',R\',F,R\',F\',R'
# # for the left
# # 'U\',L\',U,L,F\',L,F,L\''
#
# def remove_edge(cube, edge):
# # 'U,R,U\',R\',F,R\',F\',R'
#
# # solve 3rd layer
# def yellow_cross(cube):
# # 'F,R,U,R\',U\',F\',U'
# # repeat until yellow cross is formed
#
# def solve_yellow(cube):
# # 'R,U,R\',U, R, U, U, R\''
#
# def check_yellow_corners(cube, missing_corners):
#
# def check_yellow_edges(cubes, missing_corners):
#
# def position_yellow_corners(cube):
#
# def position_yellow_edges(cube):


def main():
    cube = np.arange(54).reshape(6, 3, 3)
    # cube_state, tfm_list = scramble(cube, 15)
    # # new_cube = transform_cube(cube, "R,L,U")
    # # for i in tfm_list[::-1]:
    # #     new_cube = transform_cube(new_cube, rev_moves[i])
    # cube_state = position_white_pieces1(cube_state, 28)
    # cube_state = position_white_pieces1(cube_state, 30)
    # cube_state = position_white_pieces1(cube_state, 34)
    # cube_state = position_white_pieces1(cube_state, 32)
    # cube_state = position_white_pieces1(cube_state, 27)
    # cube_state = position_white_pieces1(cube_state, 33)
    # cube_state = position_white_pieces1(cube_state, 29)
    # cube_state = position_white_pieces1(cube_state, 35)
    # # cube_state = position_white_pieces2(cube_state, 27, 33)
    # # cube_state = position_white_pieces2(cube_state, 29, 35)

    draw_cube(cube, 0.26, 0.5)
    print(cube)
    plt.show()


if __name__ == '__main__':
    main()

