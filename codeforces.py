a=list(map(int,input().split()))
b=list(map(int,input().split()))
c=list(map(int,input().split()))
for i in range(a[2]):
    d=list(map(int,input().split()))
    if(d[0]==1):
        b.append(d[1])
        c.append(d[2])
    if(d[0]==2):
        s=0
        if(d[1]==d[2]):
            print(0)
            continue
        for i in range(d[1],d[2]+1):
            if(i in b):
                continue
            p,q=max([j for j in b if j<i]),min([j for j in b if (j>i)])
            s+=c[b.index(p)]*(q-i)
        print(s)

# # 8 3 4
# 1 3 8
# 3 24 10
# 2 2 5
# 1 5 15
# 2 5 5
# 2 7 8

# a = list(map(int, input().split()))
# harbours = {}
# for pos, val in zip(map(int, input().split()), map(int, input().split())):
#     harbours[pos] = val

# for _ in range(a[2]):
#     query = list(map(int, input().split()))
#     if query[0] == 1:
#         harbours[query[1]] = query[2]
#     elif query[0] == 2:
#         result = 0
#         for i in range(query[1], query[2] + 1):
#             if(i in harbours.keys()):
#                 continue
#             left_harbour = max((j for j in harbours.keys() if j <i), default=0)
#             right_harbour = min((j for j in harbours.keys() if j>i), default=a[0] + 1)
#             result += harbours[left_harbour] * (right_harbour - i)
#         print(result)



