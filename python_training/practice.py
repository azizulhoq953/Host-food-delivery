
num1 =int(input("enter your 1st Number:"))

num2 = int(input("Enter Your 2nd Number:"))

if num1 == num2:
    print( "number Is equal")
elif num1 < num2:
    print("Number Two is greterThan:" ,num2)
elif num2 < num1:
    print("number one Is greterThan:", num1)
else:
    print("Number Is not equal:",num1,"\n", num2)



str1 = input("Enter Your string1:")
str2 = input("Enter Your Str2: ")
concatinate = str1+str2
riversed  = str2[::-1]
riversed2  = str1[::-1]
print( type( riversed2),len(riversed2) ,riversed2 )

print(str[1])




# Dictionary
user_dict= {}

num_entries = int( input("Enter Dictionary Number input:"))

for i in range(num_entries):
    key = input("Dictionary Key:")
    value = input("Dictionary Value:")

    user_dict[key] = value
    print("your Dictionary Value:",user_dict)



tuplesz = ('Azizul', 'Bd')

print(type(tuplesz), tuplesz)




odd_number =[]
even_number = []

starting_number = int(input("enter Your Starting Number:"))
last_number = int(input("enter Your Last Number:"))

for num in range(starting_number, last_number):
    if num % 2 != 0:
        odd_number.append(num)
    else:
        even_number.append(num)

print("odd Number:",odd_number, "\nEven Number", even_number)




strt_number = int(input("Enter Your Starting Number:"))

# Prime Number 
lowe = int(input("enter Your lower Number Of Digit:"))
upper = int(input("enter Your upper Number Of Digit:"))
for num in range(lowe, upper+1):
    if num > 1:
        for i in range (2, num):
            if (num % i) == 0:
                break
        else:
            print(num)


# Fibonnaci

n_terms = int(input("How Many terms user wants:"))

# First two n_terms

n1=0
n2=1
count = 0

if n_terms <=0:
    print("please Enter positive numbers:")
elif n_terms == 1:
    print("the fibonacci sequence of the number up to :", n_terms)
    print(n1)

else:
    print("the fibonacci sequence:")
    while count<n_terms:
        print(n1)
        nth = n1+n2
        # update
        n1=n2

        n2 = nth
        count +=1 



#  string palindrome
string = input("enter charcerter")

if(string == string[::-1]):
    print('is palindrome', string)
else:
    print("not Palindrome:", string)


#Number Palindrome
# palindrome is a reverse and same value show
num = int(input("enter Number:"))

temp = num
reverse = 0

while(num>0):
    digit = num % 10
    reverse = reverse*10 + digit
    num = num // 10

if (temp == reverse):
    print("Palindrome")
else:
    print("not Palindrome")

