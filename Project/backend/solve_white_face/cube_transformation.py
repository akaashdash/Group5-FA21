import matplotlib.pyplot as plt
import numpy as np

from cube_view.cube_2d import draw_cube

transform = {'R': np.eye(54), 'R\'': np.eye(54), 'L': np.eye(54), 'L\'': np.eye(54), 'U': np.eye(54),
             'U\'': np.eye(54), 'F': np.eye(54), 'F\'': np.eye(54),
             'B': np.eye(54), 'B\'': np.eye(54), 'D': np.eye(54), 'D\'': np.eye(54)}

transform['R'][47][20] = 1
transform['R'][47][47] = 0
transform['R'][50][23] = 1
transform['R'][50][50] = 0
transform['R'][53][26] = 1
transform['R'][53][53] = 0
transform['R'][42][29] = 1
transform['R'][42][42] = 0
transform['R'][39][32] = 1
transform['R'][39][39] = 0
transform['R'][36][35] = 1
transform['R'][36][36] = 0
transform['R'][26][36] = 1
transform['R'][26][26] = 0
transform['R'][23][39] = 1
transform['R'][23][23] = 0
transform['R'][20][42] = 1
transform['R'][20][20] = 0
transform['R'][29][47] = 1
transform['R'][29][29] = 0
transform['R'][32][50] = 1
transform['R'][32][32] = 0
transform['R'][35][53] = 1
transform['R'][35][35] = 0
transform['R'][9][11] = 1
transform['R'][9][9] = 0
transform['R'][10][14] = 1
transform['R'][10][10] = 0
transform['R'][11][17] = 1
transform['R'][11][11] = 0
transform['R'][12][10] = 1
transform['R'][12][12] = 0
transform['R'][14][16] = 1
transform['R'][14][14] = 0
transform['R'][15][9] = 1
transform['R'][15][15] = 0
transform['R'][16][12] = 1
transform['R'][16][16] = 0
transform['R'][17][15] = 1
transform['R'][17][17] = 0

transform['L'][44][18] = 1
transform['L'][44][44] = 0
transform['L'][41][21] = 1
transform['L'][41][41] = 0
transform['L'][38][24] = 1
transform['L'][38][38] = 0
transform['L'][45][27] = 1
transform['L'][45][45] = 0
transform['L'][48][30] = 1
transform['L'][48][48] = 0
transform['L'][51][33] = 1
transform['L'][51][51] = 0
transform['L'][33][38] = 1
transform['L'][33][33] = 0
transform['L'][30][41] = 1
transform['L'][30][30] = 0
transform['L'][18][45] = 1
transform['L'][18][18] = 0
transform['L'][21][48] = 1
transform['L'][21][21] = 0
transform['L'][24][51] = 1
transform['L'][24][24] = 0
transform['L'][27][44] = 1
transform['L'][27][27] = 0
transform['L'][0][2] = 1
transform['L'][0][0] = 0
transform['L'][1][5] = 1
transform['L'][1][1] = 0
transform['L'][2][8] = 1
transform['L'][2][2] = 0
transform['L'][3][1] = 1
transform['L'][3][3] = 0
transform['L'][5][7] = 1
transform['L'][5][5] = 0
transform['L'][6][0] = 1
transform['L'][6][6] = 0
transform['L'][7][3] = 1
transform['L'][7][7] = 0
transform['L'][8][6] = 1
transform['L'][8][8] = 0

transform['U'][20][0] = 1
transform['U'][20][20] = 0
transform['U'][19][3] = 1
transform['U'][19][19] = 0
transform['U'][18][6] = 1
transform['U'][18][18] = 0
transform['U'][35][11] = 1
transform['U'][35][35] = 0
transform['U'][34][14] = 1
transform['U'][34][34] = 0
transform['U'][33][17] = 1
transform['U'][33][33] = 0
transform['U'][11][18] = 1
transform['U'][11][11] = 0
transform['U'][14][19] = 1
transform['U'][14][14] = 0
transform['U'][17][20] = 1
transform['U'][17][17] = 0
transform['U'][0][33] = 1
transform['U'][0][0] = 0
transform['U'][3][34] = 1
transform['U'][3][3] = 0
transform['U'][6][35] = 1
transform['U'][6][6] = 0
transform['U'][36][38] = 1
transform['U'][36][36] = 0
transform['U'][37][41] = 1
transform['U'][37][37] = 0
transform['U'][38][44] = 1
transform['U'][38][38] = 0
transform['U'][39][37] = 1
transform['U'][39][39] = 0
transform['U'][41][43] = 1
transform['U'][41][41] = 0
transform['U'][42][36] = 1
transform['U'][42][42] = 0
transform['U'][43][39] = 1
transform['U'][43][43] = 0
transform['U'][44][42] = 1
transform['U'][44][44] = 0

transform['F'][42][6] = 1
transform['F'][42][42] = 0
transform['F'][43][7] = 1
transform['F'][43][43] = 0
transform['F'][44][8] = 1
transform['F'][44][44] = 0
transform['F'][51][15] = 1
transform['F'][51][51] = 0
transform['F'][52][16] = 1
transform['F'][52][52] = 0
transform['F'][53][17] = 1
transform['F'][53][53] = 0
transform['F'][15][42] = 1
transform['F'][15][15] = 0
transform['F'][16][43] = 1
transform['F'][16][16] = 0
transform['F'][17][44] = 1
transform['F'][17][17] = 0
transform['F'][6][51] = 1
transform['F'][6][6] = 0
transform['F'][7][52] = 1
transform['F'][7][7] = 0
transform['F'][8][53] = 1
transform['F'][8][8] = 0
transform['F'][27][29] = 1
transform['F'][27][27] = 0
transform['F'][28][32] = 1
transform['F'][28][28] = 0
transform['F'][29][35] = 1
transform['F'][29][29] = 0
transform['F'][30][28] = 1
transform['F'][30][30] = 0
transform['F'][32][34] = 1
transform['F'][32][32] = 0
transform['F'][33][27] = 1
transform['F'][33][33] = 0
transform['F'][34][30] = 1
transform['F'][34][34] = 0
transform['F'][35][33] = 1
transform['F'][35][35] = 0

transform['B'][45][0] = 1
transform['B'][45][45] = 0
transform['B'][46][1] = 1
transform['B'][46][46] = 0
transform['B'][47][2] = 1
transform['B'][47][47] = 0
transform['B'][36][9] = 1
transform['B'][36][36] = 0
transform['B'][37][10] = 1
transform['B'][37][37] = 0
transform['B'][38][11] = 1
transform['B'][38][38] = 0
transform['B'][0][36] = 1
transform['B'][0][0] = 0
transform['B'][1][37] = 1
transform['B'][1][1] = 0
transform['B'][2][38] = 1
transform['B'][2][2] = 0
transform['B'][9][45] = 1
transform['B'][9][9] = 0
transform['B'][10][46] = 1
transform['B'][10][10] = 0
transform['B'][11][47] = 1
transform['B'][11][11] = 0
transform['B'][18][20] = 1
transform['B'][18][18] = 0
transform['B'][19][23] = 1
transform['B'][19][19] = 0
transform['B'][20][26] = 1
transform['B'][20][20] = 0
transform['B'][21][19] = 1
transform['B'][21][21] = 0
transform['B'][23][25] = 1
transform['B'][23][23] = 0
transform['B'][24][18] = 1
transform['B'][24][24] = 0
transform['B'][25][21] = 1
transform['B'][25][25] = 0
transform['B'][26][24] = 1
transform['B'][26][26] = 0

transform['D'][27][2] = 1
transform['D'][27][27] = 0
transform['D'][28][5] = 1
transform['D'][28][28] = 0
transform['D'][29][8] = 1
transform['D'][29][29] = 0
transform['D'][24][9] = 1
transform['D'][24][24] = 0
transform['D'][25][12] = 1
transform['D'][25][25] = 0
transform['D'][26][15] = 1
transform['D'][26][26] = 0
transform['D'][8][24] = 1
transform['D'][8][8] = 0
transform['D'][5][25] = 1
transform['D'][5][5] = 0
transform['D'][2][26] = 1
transform['D'][2][2] = 0
transform['D'][15][27] = 1
transform['D'][15][15] = 0
transform['D'][12][28] = 1
transform['D'][12][12] = 0
transform['D'][9][29] = 1
transform['D'][9][9] = 0
transform['D'][45][47] = 1
transform['D'][45][45] = 0
transform['D'][46][50] = 1
transform['D'][46][46] = 0
transform['D'][47][53] = 1
transform['D'][47][47] = 0
transform['D'][48][46] = 1
transform['D'][48][48] = 0
transform['D'][50][52] = 1
transform['D'][50][50] = 0
transform['D'][51][45] = 1
transform['D'][51][51] = 0
transform['D'][52][48] = 1
transform['D'][52][52] = 0
transform['D'][53][51] = 1
transform['D'][53][53] = 0

transform['R\''] = np.transpose(transform['R'])
transform['L\''] = np.transpose(transform['L'])
transform['B\''] = np.transpose(transform['B'])
transform['U\''] = np.transpose(transform['U'])
transform['F\''] = np.transpose(transform['F'])
transform['D\''] = np.transpose(transform['D'])


def transform_cube(cube, tfm_str):
    moves = tfm_str.split(',')
    input_vec = cube.reshape(54, 1)
    for i in moves:
        input_vec = transform[i].dot(input_vec)
    tfmd_cube = input_vec.reshape(6, 3, 3).astype('int32')
    return tfmd_cube


def get_matrix(cube, tfm_str):
    moves = tfm_str.split(',')
    input_vec = cube.reshape(54, 1)
    for i in moves:
        input_vec = transform[i].dot(input_vec)
    return input_vec


# def main():
#     cube = np.arange(54).reshape(6, 3, 3)
#     new_cube = transform_cube(cube, 'R,U\',D,B')
#     draw_cube(new_cube, 0.26, 0.5)
#     print(new_cube)
#     plt.show()
#
#

# if __name__ == '__main__':
#     main()