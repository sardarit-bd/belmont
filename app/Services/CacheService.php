<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;

class CacheService
{
    private bool $redisAvailable;
    private int $defaultTtl;

    public function __construct()
    {
        $this->redisAvailable = $this->checkRedis();
        $this->defaultTtl     = config('cache.ttl', 3600); // 1 hour default
    }

    /**
     * Check if Redis is available and reachable.
     */
    private function checkRedis(): bool
    {
        if (config('cache.default') !== 'redis') {
            return false;
        }

        try {
            Redis::ping();
            return true;
        } catch (\Exception $e) {
            Log::warning('Redis unavailable, falling back to file cache.', [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    /**
     * Get the appropriate cache store.
     */
    private function store(): \Illuminate\Contracts\Cache\Repository
    {
        return $this->redisAvailable
            ? Cache::store('redis')
            : Cache::store('file');
    }

    /**
     * Get a cached value or execute the callback and cache the result.
     */
    public function remember(string $key, callable $callback, ?int $ttl = null): mixed
    {
        return $this->store()->remember(
            $key,
            $ttl ?? $this->defaultTtl,
            $callback
        );
    }

    /**
     * Store a value in cache.
     */
    public function put(string $key, mixed $value, ?int $ttl = null): bool
    {
        return $this->store()->put($key, $value, $ttl ?? $this->defaultTtl);
    }

    /**
     * Get a value from cache.
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return $this->store()->get($key, $default);
    }

    /**
     * Remove a specific key from cache.
     */
    public function forget(string $key): bool
    {
        return $this->store()->forget($key);
    }

    /**
     * Flush all keys matching a pattern (Redis only) or flush all (file).
     * Use this when admin updates content.
     */
    public function flushPattern(string $pattern): void
    {
        if ($this->redisAvailable) {
            $cursor = null;
            do {
                [$cursor, $keys] = Redis::scan($cursor, 'match', $pattern, 'count', 100);
                if (!empty($keys)) {
                    Redis::del($keys);
                }
            } while ($cursor != 0);
        } else {
            Cache::store('file')->flush();
        }
    }

    public function isRedis(): bool
    {
        return $this->redisAvailable;
    }
}