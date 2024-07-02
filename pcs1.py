n=int(input())
for i in range(n):
    b=int(input())
    s=list(input())
    c,n=0,0
    for j in s:
        if(j=="C"):
            c+=2
        elif(j=="N"):
            n+=2
        else:
            c+=1
            n+=1
    if(c>n):
        print(60*b)
    elif(n>c):
        print(40*b)
    else:
        print(55*b)

        