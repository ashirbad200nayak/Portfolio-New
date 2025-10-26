'use client';
import { useState } from 'react';
import { 
  CodeBracketIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Snippet {
  id: number;
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  tags: string[];
  color: string;
  gradient: string;
}

export const Snippets = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const snippets: Snippet[] = [
    {
      id: 1,
      title: 'React Custom Hook - useLocalStorage',
      description: 'Sync React state with localStorage with automatic JSON serialization',
      language: 'TypeScript',
      category: 'React',
      code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
      tags: ['React', 'Hooks', 'localStorage'],
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'FastAPI CRUD with Async',
      description: 'Async CRUD operations with FastAPI and Pydantic validation',
      language: 'Python',
      category: 'FastAPI',
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    price: float

items_db: List[Item] = []

@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    item.id = len(items_db) + 1
    items_db.append(item)
    return item

@app.get("/items/", response_model=List[Item])
async def read_items(skip: int = 0, limit: int = 10):
    return items_db[skip : skip + limit]

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")`,
      tags: ['FastAPI', 'Python', 'API', 'Async'],
      color: 'teal',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      id: 3,
      title: 'Django Custom User Model',
      description: 'Extended user model with email authentication and custom fields',
      language: 'Python',
      category: 'Django',
      code: `from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']`,
      tags: ['Django', 'Auth', 'Models', 'Python'],
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      id: 4,
      title: 'Pinecone Vector Search',
      description: 'Initialize and query Pinecone vector database with embeddings',
      language: 'Python',
      category: 'VectorDB',
      code: `import pinecone
from sentence_transformers import SentenceTransformer

# Initialize Pinecone
pinecone.init(api_key="YOUR_API_KEY", environment="us-west1-gcp")

# Create index
index_name = "semantic-search"
if index_name not in pinecone.list_indexes():
    pinecone.create_index(index_name, dimension=384)

index = pinecone.Index(index_name)

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Insert vectors
texts = ["Machine learning is amazing", "AI is the future"]
vectors = model.encode(texts)

for i, (text, vector) in enumerate(zip(texts, vectors)):
    index.upsert([(f"doc-{i}", vector.tolist(), {"text": text})])

# Query
query = "artificial intelligence"
query_vector = model.encode([query])[0]
results = index.query(query_vector.tolist(), top_k=5, include_metadata=True)`,
      tags: ['Pinecone', 'VectorDB', 'Embeddings', 'AI'],
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      id: 5,
      title: 'OpenAI ChatGPT Streaming',
      description: 'Stream ChatGPT responses with async iteration and error handling',
      language: 'Python',
      category: 'Gen AI',
      code: `from openai import AsyncOpenAI
import asyncio

client = AsyncOpenAI(api_key="YOUR_API_KEY")

async def stream_chat(messages: list):
    try:
        stream = await client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            stream=True,
            temperature=0.7,
        )
        
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                print(content, end="", flush=True)
                yield content
                
    except Exception as e:
        print(f"Error: {e}")
        yield None

# Usage
async def main():
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing"}
    ]
    
    async for chunk in stream_chat(messages):
        if chunk:
            # Process each chunk
            pass

asyncio.run(main())`,
      tags: ['OpenAI', 'ChatGPT', 'Streaming', 'Gen AI'],
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      id: 6,
      title: 'Django REST ViewSet',
      description: 'Complete viewset with permissions, filtering, and pagination',
      language: 'Python',
      category: 'Django',
      code: `from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'price']
    search_fields = ['name', 'description']
    
    def get_queryset(self):
        # Custom filtering
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(is_published=True)
    
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        product = self.get_object()
        product.is_published = True
        product.save()
        return Response({'status': 'published'})`,
      tags: ['Django', 'REST', 'API', 'ViewSet'],
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 7,
      title: 'LangChain RAG Pipeline',
      description: 'Retrieval Augmented Generation with vector store and LLM',
      language: 'Python',
      category: 'Gen AI',
      code: `from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load and split documents
loader = TextLoader('documents.txt')
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
splits = text_splitter.split_documents(documents)

# Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(splits, embeddings)

# Create RAG chain
llm = ChatOpenAI(model_name="gpt-4", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    return_source_documents=True
)

# Query
result = qa_chain({"query": "What is the main topic?"})
print(result["result"])`,
      tags: ['LangChain', 'RAG', 'Gen AI', 'VectorDB'],
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 8,
      title: 'FastAPI JWT Authentication',
      description: 'Secure JWT token-based authentication with refresh tokens',
      language: 'Python',
      category: 'FastAPI',
      code: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401)
        return username
    except JWTError:
        raise HTTPException(status_code=401)`,
      tags: ['FastAPI', 'JWT', 'Auth', 'Security'],
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 9,
      title: 'Chroma Vector Store with OpenAI',
      description: 'Store and retrieve documents using ChromaDB with OpenAI embeddings',
      language: 'Python',
      category: 'VectorDB',
      code: `import chromadb
from chromadb.config import Settings
from openai import OpenAI

# Initialize clients
client = OpenAI(api_key="YOUR_API_KEY")
chroma_client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))

# Create collection
collection = chroma_client.get_or_create_collection("documents")

def get_embedding(text: str):
    response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response.data[0].embedding

# Add documents
texts = ["Python is great", "AI is transformative"]
for i, text in enumerate(texts):
    embedding = get_embedding(text)
    collection.add(
        ids=[f"doc_{i}"],
        embeddings=[embedding],
        documents=[text],
        metadatas=[{"source": "manual"}]
    )

# Query
query = "programming languages"
query_embedding = get_embedding(query)
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=3
)`,
      tags: ['ChromaDB', 'OpenAI', 'VectorDB', 'Embeddings'],
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 10,
      title: 'Django Celery Task',
      description: 'Asynchronous background tasks with Celery and Redis',
      language: 'Python',
      category: 'Django',
      code: `from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
import time

@shared_task(bind=True, max_retries=3)
def send_email_task(self, user_email, subject, message):
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user_email],
            fail_silently=False,
        )
        return f"Email sent to {user_email}"
    except Exception as exc:
        # Retry with exponential backoff
        raise self.retry(exc=exc, countdown=60 * (2 ** self.request.retries))

@shared_task
def process_large_dataset(data_id):
    # Simulate long processing
    time.sleep(10)
    # Process data
    return {"status": "completed", "data_id": data_id}

# Usage in views:
# from .tasks import send_email_task
# send_email_task.delay(user.email, "Welcome", "Thanks for signing up!")`,
      tags: ['Django', 'Celery', 'Async', 'Tasks'],
      color: 'lime',
      gradient: 'from-lime-500 to-green-500'
    },
    {
      id: 11,
      title: 'Hugging Face Text Generation',
      description: 'Generate text using Hugging Face transformers with custom parameters',
      language: 'Python',
      category: 'Gen AI',
      code: `from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load model and tokenizer
model_name = "gpt2-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def generate_text(prompt, max_length=100, temperature=0.7):
    # Encode input
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    
    # Generate
    with torch.no_grad():
        outputs = model.generate(
            inputs,
            max_length=max_length,
            temperature=temperature,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            do_sample=True,
            top_k=50,
            top_p=0.95
        )
    
    # Decode and return
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text

# Usage
result = generate_text("The future of AI is", max_length=150)
print(result)`,
      tags: ['Hugging Face', 'Transformers', 'Gen AI', 'NLP'],
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 12,
      title: 'Intersection Observer Hook',
      description: 'Detect when element enters viewport for lazy loading and animations',
      language: 'TypeScript',
      category: 'React',
      code: `import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver(
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target);

    return () => observer.disconnect();
  }, [options]);

  return { targetRef, isIntersecting };
}`,
      tags: ['React', 'Hooks', 'Performance'],
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500'
    },
  ];

  const categories = ['all', ...Array.from(new Set(snippets.map(s => s.category)))];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = async (code: string, id: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section id="snippets" className="mb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 border border-cyan-200 dark:border-cyan-800">
            <CodeBracketIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Code Library</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Useful Code Snippets
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ready-to-use code patterns and utilities I've built and refined over time
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <FunnelIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Showing {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''}
        </div>

        {/* Snippets Grid */}
        {filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet, index) => (
              <div
                key={snippet.id}
                className="group relative rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${snippet.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}></div>

                <div className="relative p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {snippet.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {snippet.description}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${snippet.gradient} text-white text-xs font-semibold whitespace-nowrap`}>
                      {snippet.language}
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 dark:bg-slate-950">
                    {/* Copy Button */}
                    <button
                      onClick={() => copyToClipboard(snippet.code, snippet.id)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 z-10"
                      title="Copy to clipboard"
                    >
                      {copiedId === snippet.id ? (
                        <CheckIcon className="w-5 h-5 text-green-400" />
                      ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                      )}
                    </button>

                    {/* Code */}
                    <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <CodeBracketIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              No snippets found matching your search
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center pt-8">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Want more snippets or have a specific request?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Get in Touch</span>
            <CodeBracketIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 4px;
        }
        .scrollbar-track-slate-900::-webkit-scrollbar-track {
          background-color: #0f172a;
        }
      `}</style>
    </section>
  );
};