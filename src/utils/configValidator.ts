import type { 
  ServicesConfig, 
  PartnersConfig, 
  SponsorsConfig, 
  CDNMirrorConfig,
  ConfigValidationResult 
} from '~/types'

// JSON模式验证工具
export class ConfigValidator {
  private static validateJsonStructure(data: any, requiredFields: string[]): string[] {
    const errors: string[] = []
    
    if (!data || typeof data !== 'object') {
      errors.push('Configuration must be a valid JSON object')
      return errors
    }

    for (const field of requiredFields) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`)
      }
    }

    return errors
  }

  private static validateIPAddress(ip: string): boolean {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipRegex.test(ip)
  }

  private static validateURL(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  static validateServicesConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 基本结构验证
    const structureErrors = this.validateJsonStructure(data, ['services'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    // Validate services array
    if (!Array.isArray(data.services)) {
      errors.push('Services must be an array')
      return { isValid: false, errors, warnings }
    }

    // Validate each service
    data.services.forEach((service: any, index: number) => {
      const serviceErrors = this.validateJsonStructure(service, [
        'id', 'name', 'provider', 'description', 'status', 'optimizedIPs', 'nodeStatus', 'tags'
      ])
      
      serviceErrors.forEach(error => {
        errors.push(`Service ${index}: ${error}`)
      })

      // Validate provider enum
      if (service.provider && !['cloudflare', 'cloudfront', 'edgeone', 'other'].includes(service.provider)) {
        errors.push(`Service ${index}: Invalid provider "${service.provider}"`)
      }

      // Validate status enum
      if (service.status && !['active', 'inactive', 'maintenance'].includes(service.status)) {
        errors.push(`Service ${index}: Invalid status "${service.status}"`)
      }

      // Validate nodeStatus enum
      if (service.nodeStatus && !['online', 'offline', 'slow'].includes(service.nodeStatus)) {
        errors.push(`Service ${index}: Invalid nodeStatus "${service.nodeStatus}"`)
      }

      // Validate IP addresses
      if (Array.isArray(service.optimizedIPs)) {
        service.optimizedIPs.forEach((ip: string, ipIndex: number) => {
          if (!this.validateIPAddress(ip)) {
            errors.push(`Service ${index}: Invalid IP address at index ${ipIndex}: "${ip}"`)
          }
        })
      }

      // Validate response time
      if (service.responseTime !== undefined && (typeof service.responseTime !== 'number' || service.responseTime < 0)) {
        errors.push(`Service ${index}: Response time must be a positive number`)
      }
    })

    return { isValid: errors.length === 0, errors, warnings }
  }

  static validatePartnersConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Basic structure validation
    const structureErrors = this.validateJsonStructure(data, ['partners'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    // Validate partners array
    if (!Array.isArray(data.partners)) {
      errors.push('Partners must be an array')
      return { isValid: false, errors, warnings }
    }

    // Validate each partner
    data.partners.forEach((partner: any, index: number) => {
      const partnerErrors = this.validateJsonStructure(partner, [
        'id', 'name', 'logo', 'description', 'website', 'type'
      ])
      
      partnerErrors.forEach(error => {
        errors.push(`Partner ${index}: ${error}`)
      })

      // Validate type enum
      if (partner.type && !['platinum', 'gold', 'silver', 'bronze'].includes(partner.type)) {
        errors.push(`Partner ${index}: Invalid type "${partner.type}"`)
      }

      // Validate URLs
      if (partner.logo && !this.validateURL(partner.logo)) {
        errors.push(`Partner ${index}: Invalid logo URL "${partner.logo}"`)
      }

      if (partner.website && !this.validateURL(partner.website)) {
        errors.push(`Partner ${index}: Invalid website URL "${partner.website}"`)
      }
    })

    return { isValid: errors.length === 0, errors, warnings }
  }

  static validateSponsorsConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Basic structure validation
    const structureErrors = this.validateJsonStructure(data, ['sponsors'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    // Validate sponsors array
    if (!Array.isArray(data.sponsors)) {
      errors.push('Sponsors must be an array')
      return { isValid: false, errors, warnings }
    }

    // Validate each sponsor
    data.sponsors.forEach((sponsor: any, index: number) => {
      const sponsorErrors = this.validateJsonStructure(sponsor, [
        'id', 'name', 'logo', 'description', 'website', 'level'
      ])
      
      sponsorErrors.forEach(error => {
        errors.push(`Sponsor ${index}: ${error}`)
      })

      // Validate level enum
      if (sponsor.level && !['diamond', 'platinum', 'gold', 'silver'].includes(sponsor.level)) {
        errors.push(`Sponsor ${index}: Invalid level "${sponsor.level}"`)
      }

      // Validate URLs
      if (sponsor.logo && !this.validateURL(sponsor.logo)) {
        errors.push(`Sponsor ${index}: Invalid logo URL "${sponsor.logo}"`)
      }

      if (sponsor.website && !this.validateURL(sponsor.website)) {
        errors.push(`Sponsor ${index}: Invalid website URL "${sponsor.website}"`)
      }
    })

    return { isValid: errors.length === 0, errors, warnings }
  }

  static validateCDNConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Basic structure validation
    const structureErrors = this.validateJsonStructure(data, ['github', 'npm'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    // Validate GitHub config
    if (data.github) {
      const githubErrors = this.validateJsonStructure(data.github, ['template', 'mirror'])
      githubErrors.forEach(error => {
        errors.push(`GitHub config: ${error}`)
      })

      // Validate template contains required placeholders
      if (data.github.template) {
        const requiredPlaceholders = ['{{mirror}}', '{{owner}}', '{{repo}}', '{{branch}}', '{{path}}']
        requiredPlaceholders.forEach(placeholder => {
          if (!data.github.template.includes(placeholder)) {
            errors.push(`GitHub template missing placeholder: ${placeholder}`)
          }
        })
      }
    }

    // Validate NPM config
    if (data.npm) {
      const npmErrors = this.validateJsonStructure(data.npm, ['template', 'mirror'])
      npmErrors.forEach(error => {
        errors.push(`NPM config: ${error}`)
      })

      // Validate template contains required placeholders
      if (data.npm.template) {
        const requiredPlaceholders = ['{{mirror}}', '{{package}}', '{{version}}', '{{path}}']
        requiredPlaceholders.forEach(placeholder => {
          if (!data.npm.template.includes(placeholder)) {
            errors.push(`NPM template missing placeholder: ${placeholder}`)
          }
        })
      }
    }

    // Validate alternatives (optional)
    if (data.alternatives && data.alternatives.mirrors) {
      if (!Array.isArray(data.alternatives.mirrors)) {
        errors.push('Alternatives mirrors must be an array')
      } else if (data.alternatives.mirrors.length === 0) {
        warnings.push('Alternatives mirrors array is empty')
      }
    }

    return { isValid: errors.length === 0, errors, warnings }
  }
}