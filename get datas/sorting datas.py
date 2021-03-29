def decoupeAddresse(string):
    counter = 0
    string = string.split("CEDEX")[0]
    for i in range(len(string)):
        if string[i].isnumeric():
            counter += 1
        else:
            counter = 0
        if counter == 5:
            return string[:i - 5], string[i - 4:i + 1], string[i + 2:]


def printDatas(datas):
    print("{")
    for data in datas:
        print("\t{")
        for thing in datas[data]:
            print(f"\t\t{thing}: {datas[data][thing]}")
        print("\t}")
    print("}")


if __name__ == '__main__':
    datas = open("datas.json", "w", encoding="utf-8")
    datas.write("[\n")
    with open("sites-prelevements-acces-restreint.csv", encoding="utf-8") as f:
        skull = f.readline()[:-1].split(',')
        for data in f.readlines():
            data = data[:-1].replace("\"", "").split(',')
            datas.write("\t{\n")
            for i in range(len(skull)-1):
                datas.write("\t\t" + f"\"{skull[i]}\": \"{data[i]}\",\n")
            datas.write("\t\t" + f"\"{skull[-1]}\": \"{data[-1]}\"\n")
            datas.write("\t},\n")
        f.close()
    datas.write("]\n")
    datas.close()
