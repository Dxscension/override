--[[

Credits: 

Rest of the obfuscation: Avian (https://github.com/AviansEpic)
LBI: JustAPerson (https://github.com/JustAPerson/lbi)
Minifier: stravant (https://github.com/stravant/lua-minify)

]]

print("Minifying script...")

os.execute("lua minifier/minify.lua minify input.lua > minifier/output.lua")

print("Minified!")

local src = io.open('minifier/output.lua','r'):read("*all")

print("Converting to bytecode...")

local bytecode = string.dump(loadstring(src))

print("Converted")

local otherfile = io.open('obfuscation/luac.out', "w")

otherfile:write(bytecode)

otherfile:close()

print("Starting obfuscation...")

dofile("obfuscation/converter.lua")

