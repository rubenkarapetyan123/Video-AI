from tensorflow.keras.models import Sequential, model_from_yaml
from tensorflow.keras.models import load_model

import cv2
import pickle

import sys

with open('/Users/user/Desktop/Video-AI/python-scripts/Terminator/tokens.pickle', 'rb') as handle:
    tokens = pickle.load(handle)
 
# print(tokens)

def text_to_token(tokens_data):

  tokens={}
  tok={}
  g=0

  is_two=False
  for i in tokens_data:
    for j in i:
      if len(j)<25:
        if None == tokens.get(j):
          tokens[j]={}
        is_two=False
        for jj in i:
            if len(jj)<25 and is_two:

              if None == tokens[j].get(jj):
                tokens[j][jj]=1
                ##print(tokens[j][[jj]])
              else:
                tokens[j][jj]+=1
            is_two=True

    if g==100:
      g=0
      for k in tokens:
        for kk in list(tokens[k]):
          if tokens[k][kk] ==1:
            tokens[k].pop(kk)
    g+=1

  return tokens

def print_tokens(tokens,num_collumn):
  g=0
  for i in tokens:
    if g==num_collumn:
      g=0
      print(i + ":  " + str(tokens.get(i))+"   |   ")
    else:
      print(i + ":  " + str(tokens.get(i))+"   |   ",end="")
    g+=1

def vectorize_tokens(tokens, token):
    arr = []
    for i in tokens:
        if i == token:
            arr.append(1)
        else:
            arr.append(0)
    return arr

def vectorize_tokens_tok(tokens,tokens_data,token):
  arr=[]
  is_true = False
  for i in tokens_data:

    for j in i:
      if j == token:
        is_true = True
    if(is_true):
      is_true = False
      for i in tokens:
          if i == token:
            arr.append(1)

          else:
            g = tokens[token].get(i)
            if g == None:
              arr.append(0)
            else:
              arr.append(g/100)
      return arr


def vetorize_string(tokens,string):
    arr=[]
    is_str=False
    g=1
    for i in tokens:
        for j in string.split():
            # print(j)
            if i == j:
                # print(i)
                is_str = True
        if is_str:
            is_str=False
            arr.append(1-(g/1000))
        else:
            arr.append(0)
        g+=1
    return arr


def vector_to_string(tokens,vector):
    # print(vector[0])
    dt = []
    arr=" "
    g=0
    num =0.00023
    word ="none"
    for i in tokens:
        # print(i)
        # print(vector[g])

        if vector[g]>num:
          word = i

          dt.append(i)

          # print(i)
        g+=1

    for i in range(len(dt)):
      arr+=dt[len(dt)-1-i]+" "

    return arr



def url_to_image(url, scale,readFlag= cv2.IMREAD_GRAYSCALE):
    # download the image, convert it to a NumPy array, and then read
    # it into OpenCV format
    try:
        image = cv2.imread(url, cv2.IMREAD_COLOR) 
        image =cv2.resize(image, (scale, scale) )
        image = cv2.Canny(image,90, 90)
        return image
    except:
      print(url)

def vectorize_img(img):
  arr =[]
  for i in img:
    for j in i:
      arr.append((j*3.921)/1000)
  return arr


image_name = sys.argv[1]


image = url_to_image("/Users/user/Desktop/Video-AI/images/"+image_name,50)
# print(img)
# image = cv2.imread("C://Users//User//Desktop//Terminator//tets.jpg", cv2.IMREAD_COLOR) 

# print(image)

img_v= vectorize_img(image)
new_model = load_model("/Users/user/Desktop/Video-AI/python-scripts/Terminator/model_v1.0.h5")

output=new_model.predict((img_v,),batch_size=64,verbose=0)
print(vector_to_string(tokens,output[0]))