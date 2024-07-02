ok={"monday":[1,8,15,22,29],"tuesday":[2,8,16,23,30],"wednesday":[3,10,17,24],"thrusday":[4,11,18,25],"friday":[5,12,19,26],"saturday":[6,13,20,26],"sunday":[7,14,21,28]}
n=int(input())
for i in range(n):
    d=8
    b=int(input())
    c=list(map(int,input().split()))
    for i in c:
        if(i not in ok["saturday"] and i not in ok["sunday"]):
            d+=1
    print(d)

    