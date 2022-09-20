
local config = {
	sun_tzu_qoutes = true
}

-- thank you stackoverflow lmao
function toHex(str)
    return (str:gsub('.', function (c)return string.format('%02X', string.byte(c))end)) 
end
-------------------------------

math.randomseed(os.time())
bit32 = bit32 or {}
bit32.bxor = bit32.bxor or function(a,b)
    local p,c=1,0
    while a>0 and b>0 do
        local ra,rb=a%2,b%2
        if ra~=rb then c=c+p end
        a,b,p=(a-ra)/2,(b-rb)/2,p*2
    end
    if a<b then a=b end
    while a>0 do
        local ra=a%2
        if ra>0 then c=c+p end
        a,p=(a-ra)/2,p*2
    end
    return c
end

local bytecode = io.open('obfuscation/luac.out','r'):read("*all")

local xor = math.random(10,255)


local sun_tzu={"The general who wins the battle makes many calculations in his temple before the battle is fought. The general who loses makes but few calculations beforehand.","A leader leads by example not by force.","The control of a large force is the same principle as the control of a few men: it is merely a question of dividing up their numbers.","The ultimate in disposing one's troops is to be without ascertainable shape. Then the most penetrating spies cannot pry in nor can the wise lay plans against you.","If words of command are not clear and distinct, if orders are not thoroughly understood, the general is to blame. But if his orders ARE clear, and the soldiers nevertheless disobey, then it is the fault of their officers.","Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat.","All warfare is based on deception.","If fighting is sure to result in victory, then you must fight.","One defends when his strength is inadaquate, he attacks when it is abundant.","The quality of decision is like the well-timed swoop of a falcon which enables it to strike and destroy its victim.","When the enemy is at ease, be able to weary him; when well fed, to starve him; when at rest, to make him move. Appear at places to which he must hasten; move swiftly where he does not expect you.","If you know your enemy and you know yourself you need not fear the results of a hundred battles. If you know yourself but not the enemy for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself you will succumb in every battle.","The general who advances without coveting fame and retreats without fearing disgrace, whose only thought is to protect his country and do good service for his sovereign, is the jewel of the kingdom.","For to win one hundred victories in one hundred battles is not the acme of skill. To subdue the enemy without fighting is the acme of skill.","What the ancients called a clever fighter is one who not only wins, but excels in winning with ease.","To a surrounded enemy, you must leave a way of escape.","To know your Enemy, you must become your Enemy.","Thus, what is of supreme importance in war is to attack the enemy's strategy.","A leader leads by example, not force.","Too frequent rewards indicate that the general is at the end of his resources; too frequent punishments that he is in acute distress.","Pretend inferiority and encourage his arrogance.","All men can see these tactics whereby I conquer, but what none can see is the strategy out of which victory is evolved.","If we do not wish to fight, we can prevent the enemy from engaging us even though the lines of our encampment be merely traced out on the ground. All we need to do is to throw something odd and unaccountable in his way.","A military operation involves deception. Even though you are competent, appear to be incompetent. Though effective, appear to be ineffective.","Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.","The best victory is when the opponent surrenders of its own accord before there are any actual hostilities... It is best to win without fighting.","Opportunities multiply as they are seized.","Speed is the essence of war. Take advantage of the enemy's unpreparedness; travel by unexpected routes and strike him where he has taken no precautions.","If your opponent is of choleric temperament, seek to irritate him.","Management of many is the same as management of few. It is a matter of organization.","The good fighters of old first put themselves beyond the possibility of defeat, and then waited for an opportunity of defeating the enemy.","Build your opponent a golden bridge to retreat across.","Swift as the wind. Quiet as the forest. Conquer like the fire. Steady as the mountain.","It is essential to seek out enemy agents who have come to conduct espionage against you and to bribe them to serve you. Give them instructions and care for them. Thus doubled agents are recruited and used.","Now the reason the enlightened prince and the wise general conquer the enemy whenever they move and their achievements surpass those of ordinary men is foreknowledge.","And therefore those skilled in war bring the enemy to the field of battle and are not brought there by him.","There is no instance of a nation benefitting from prolonged warfare.","When able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near.","When torrential water tosses boulders, it is because of its momentum. When the strike of a hawk breaks the body of its prey, it is because of timing.","Secret operations are essential in war; upon them the army relies to make its every move.","It is said that if you know your enemies and know yourself, you will not be imperilled in a hundred battles; if you do not know your enemies but do know yourself, you will win one and lose one; if you do not know your enemies nor yourself, you will be imperilled in every single battle.","He who knows when he can fight and when he cannot will be victorious.","Subtle and insubstantial, the expert leaves no trace; divinely mysterious, he is inaudible. Thus he is master of his enemy's fate.","A skilled commander seeks victory from the situation and does not demand it of his subordinates."}

local me_me = {}

for line in io.open("obfuscation/memes.txt",'r'):lines() do
	table.insert(me_me,line)
end    


function l(b)
    if b == '\\27Lua' then return '"\\27Lua"' end
    if b == 'Lua bytecode expected.' then return '"Lua bytecode expected."' end
    if b == "Only Lua 5.1 is supported." then return '"Only Lua 5.1 is supported."' end
    if b == "\\4\\8\\0" then return '"\\4\\8\\0"' end
    if b == "Unsupported bytecode target platform" then return '"Unsupported bytecode target platform"' end 

    b = toHex(b)
  
    local l = ""
    
    for i = 1,#b do
		local xor = bit32.bxor(b:sub(i,i):byte(),xor)
		if #string.format("%x",xor) == 2 then
        	l = l.."\\x"..(string.format("%x",xor))
		else
			l = l.."\\"..(xor)
		end
    end
    
    return "l(\""..l.."\")" 
end;

bytecode = l(bytecode)
bytecode = bytecode:sub(2,#bytecode)

function me_me_gen(s)
    local fune = ""
    local tbl = me_me
    if config["sun_tzu_qoutes"] then tbl = sun_tzu end
    for i = 1,50 do
        local meme = tbl[math.random(1,#tbl)]:gsub("'","\\'")
        if config["sun_tzu_qoutes"] then meme = '"'..meme..'" - Sun Tzu' end
    
        fune = fune.."fune["..math.random(10000,1000000)+tonumber("."..math.random(10000,1000000)).."]=#\'"..meme.."'-("..(-69+#meme)..");"
    end
    
    return fune
end

local funething = ""
local funethings = {}

for i = 1,100 do
    local char = string.char(math.random(65,90))
    funething = funething .. "'" .. char .. "'"
    if i ~= 100 then funething = funething.."," end
    table.insert(funethings,char)
end

local s = io.open("obfuscation/LBI.lua","r"):read("*all")

s = [[
--]].."[["..[[

    Override, free LBI based obfuscator.
]].."]]"..[[


]]..s

s = s:gsub('REPLACEMEFUNETHING',funething)


local tokenizing = false
local token = ""
local new = ""
local tokens = 0



for i=1,#s do
	local shouldContinue = false
    i = s:sub(i,i)
    if i == '"' then
        tokenizing = not tokenizing
        if not tokenizing then 
            new = new..l(token)
            token = ''
        end
        shouldContinue = true
    end
    if not shouldContinue then
      if tokenizing then token = token .. i else new = new..i end
    end
end

new = new:gsub('REPLACEMEPLSPLSPLS',bytecode)
new = new:gsub('REPLACEMEHEX',string.format("%x",xor))
new = new:gsub('REPLACEMEMEME1',me_me_gen())
new = new:gsub('REPLACEMEMEME2',me_me_gen())



local file = io.open('output.lua',"w")
file:write(new)
file:close()

print("Obfuscated! Saved your script to: output.lua")
