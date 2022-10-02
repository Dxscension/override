local f = io.open("luac.out","r"):read("*all")

print(f:gsub(".",function(b)
	return "\\"..b:byte()
end))