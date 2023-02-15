import fitz
import re

import os

import nltk
from nltk.tokenize import word_tokenize


nltk.download('punkt')
nltk.download('stopwords')
nltk.download('words')

# from nltk.corpus import stopwords
# from nltk.corpus import words
# from string import punctuation

import pymorphy2

from pprint import pprint

def get_info(path):
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('words')
    
    from nltk.corpus import stopwords
    from nltk.corpus import words
    from string import punctuation
    
    with fitz.open(path) as pdf:
        text = ''

        for page in pdf:
            text += page.get_text()

    is_russian = re.compile('[А-я]+')

    stopwords = stopwords.words("russian")
    tokens = [
       token for token in word_tokenize(text, language="russian") \
            if token.casefold() not in stopwords and token.casefold() != " " \
            and len(set(list(token.casefold())) & set(list(punctuation))) == 0 \
            and is_russian.match(token)
    ]

    morph = pymorphy2.MorphAnalyzer(lang="ru")

    lexemes = set()

    for token in tokens:
        word_forms = morph.parse(token)[0].lexeme
        if str(word_forms[0].tag) == "UNKN":
            continue

        word_forms = tuple(map(lambda word: word.word, word_forms))
        lexemes.add(word_forms)

    lexemes = list(lexemes)
    
    info = []

    for lexem in lexemes:
        words = []
        for token in tokens:
            if token in lexem:
                words.append(token)

        frequency = {}

        for word in lexem:
            frequency[word] = words.count(word) / len(words) if len(words) != 0 else 0

        info.append((words, frequency))

    return info

    