import {
  Activity, ArrowRight, Award, BedDouble, BookOpen, Calendar,
  CheckCircle, ChevronDown, Clock, Coffee, Facebook, Heart,
  Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Quote,
  Send, Shield, ShieldPlus, Stethoscope, Thermometer, Users,
  Wind, X, Youtube, Zap,
} from 'lucide-react'

const ICON_REGISTRY = {
  Activity, ArrowRight, Award, BedDouble, BookOpen, Calendar,
  CheckCircle, ChevronDown, Clock, Coffee, Facebook, Heart,
  Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Quote,
  Send, Shield, ShieldPlus, Stethoscope, Thermometer, Users,
  Wind, X, Youtube, Zap,
}

export function getIcon(name) {
  return ICON_REGISTRY[name] ?? null
}

export default ICON_REGISTRY
