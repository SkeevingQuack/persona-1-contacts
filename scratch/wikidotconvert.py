from enum import Enum
import json
from pprint import pp as pprint
import re

def main():
	skills = {}
	with open("oldDB.json", "r", encoding="utf-8") as f:
		db = json.load(f)
		characters = {}
		for character in db["negotiationSkills"]:
			for skill in character["skills"]:
				try:
					skills[skill].append(character["nickname"])
				except KeyError:
					skills[skill]=[character["nickname"]]

	personalities = []
	with open("wikidot.txt", mode='r', encoding='utf-8') as f:
		while True:
			intro = f.readline().strip()
			if intro == '':
				break		# break if done
			f.readline()	# empty line
			happy = f.readline().strip()
			eager = f.readline().strip()
			angry = f.readline().strip()
			scared = f.readline().strip()
			f.readline()	# empty line
			personalities.append(wikidotParser(intro,happy,eager,angry,scared, skills))

	db["personalities"] = [x.jsonify() for x in personalities]
	with open("dbNew.json", 'x', encoding='utf-8') as f:
		json.dump(db, f, indent=2)



class Gender(Enum):
	# Not intended as a commentary on reality
	FEMALE = 1
	MALE = 2
	IRRELEVANT = 3

class PersonalityType:
	def __init__(self, plist: list[str], 
					   gender: Gender, 
					   demons: list[str]):
		self.personality = plist
		self.gender = gender
		self.demons = demons
	def __repr__(self):
		return "{} ({}): {}\n\tHappy: {}\n\tEager: {}\n\tAngry: {}\n\tScared: {}".format(
									      ", ".join(self.personality), 
										  str(self.gender), 
										  ", ".join(self.demons),
										  ", ".join(self.happy),
										  ", ".join(self.eager),
										  ", ".join(self.angry),
										  ", ".join(self.scared))
	def jsonify(self):
		blob = {"personality": self.personality}
		blob["gender"] = self.gender.name
		blob["demons"] = self.demons
		blob["emotions"] = {"happy": self.happy, "eager": self.eager, "angry": self.angry, "scared": self.scared}
		return blob

def emotionParser(emotionstring, skilldict):
	"""Actually parses the negotiation skills attached to an emotion"""
	result = []
	matches = re.finditer(r'([A-Z][a-z]+)( \(([A-Za-z, ]+)\))?', emotionstring)
	for match in matches:
		skill = match.group(1)
		if match.group(3) == None:
			# No character is specified, so fetch all characters with skill
			for character in skilldict[skill]:
				result.append(character + '>' + skill)
		else:
			characters = [x.strip() for x in match.group(3).split(',')]
			for character in characters:
				result.append(character + '>' + skill)
	return result


def wikidotParser(intro, happy, eager, angry, scared, skilldict) -> PersonalityType:
	intropat = r'([A-Za-z]+(, [A-Za-z]+){0,3}) ?\(?(Male|Female)?\)?: ([A-Za-z \.-]+(, [A-Za-z -]*)*)'
	match = re.fullmatch(intropat, intro)
	if match == None:
		raise ValueError("Not a valid intro line", intro)
	plist = [x.strip() for x in match.group(1).split(',')]
	if match.group(3) == "Male":
		gender = Gender.MALE
	elif match.group(3) == "Female":
		gender = Gender.FEMALE
	elif match.group(3) == None:
		gender = Gender.IRRELEVANT
	else:
		raise Exception
	demons = [x.strip() for x in match.group(4).split(',')]
	personality = PersonalityType(plist, gender, demons)

	match = re.fullmatch(r'Happy:(.*)', happy)
	if match == None:
		raise ValueError("Not a valid Happy line", happy, intro)
	elif match.group(1) == '':
		personality.happy = []
	else:
		personality.happy = emotionParser(match.group(1), skilldict)

	match = re.fullmatch(r'Eager:(.*)', eager)
	if match == None:
		raise ValueError("Not a valid Eager line", eager, intro)
	elif match.group(1) == '':
		personality.eager = []
	else:
		personality.eager = emotionParser(match.group(1), skilldict)

	match = re.fullmatch(r'Angry:(.*)', angry)
	if match == None:
		raise ValueError("Not a valid Angry line", angry, intro)
	elif match.group(1) == '':
		personality.angry = []
	else:
		personality.angry = emotionParser(match.group(1), skilldict)

	match = re.fullmatch(r'Scared:(.*)', scared)
	if match == None:
		raise ValueError("Not a valid Scared line", scared, intro)
	elif match.group(1) == '':
		personality.scared = []
	else:
		personality.scared = emotionParser(match.group(1), skilldict)

	return personality


if __name__=="__main__":
	main()