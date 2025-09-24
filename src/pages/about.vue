<template>
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-cascadia">关于我们</h1>
        <div class="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
      </div>

      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div class="prose prose-lg mx-auto">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">项目简介</h2>
          <p class="mb-6">
            NB 优选服务是一个致力于为开发者和网站运营者提供全球主流云服务商的 CDN 节点优选和节点状态监测服务的开源项目。我们的目标是帮助用户获得更快、更稳定的网络体验。
          </p>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">我们是谁？</h2>
          <p class="mb-6">
            我们是热爱技术的、为爱发电的开发者。我们相信，通过开源和共享，可以推动技术的进步和网络的优化。我们致力于为用户提供最好的服务，让用户能够享受到更快的网络速度和更好的用户体验。
          </p>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">技术支持</h2>
          <p class="mb-6">
            我们支持 CloudFlare、Vercel、Netlify 等全球主流云服务商的 CDN 节点监测和 IP 优选。我们定期更新数据，确保用户能够获取最新、最准确的网络状态信息。
          </p>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">项目代码</h2>
          <p class="mb-6">
            我们的项目代码托管在 GitHub 上，您可以在 <a href="https://github.com/FrecklyComb1728/byoip-pages" class="text-blue-600 hover:text-blue-800">这里</a> 查看和参与项目的开发。
          </p>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">联系我们</h2>
          <p>
            如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们：
          </p>
          <ul class="list-disc pl-6 mt-2">
            <li>GitHub: <a href="https://github.com/FrecklyComb1728/byoip-pages" class="text-blue-600 hover:text-blue-800">github.com</a></li>
            <li>Email: me@imbee.top</li>
            <li>QQ：3979158171</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 页面标题
useHead({
  title: '关于我们 - NB 优选服务',
  meta: [
    { name: 'description', content: 'NB 优选服务项目介绍、使命和联系方式' }
  ]
})
</script>